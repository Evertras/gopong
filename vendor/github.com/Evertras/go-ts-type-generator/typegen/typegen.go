package typegen

import (
	"errors"
	"io"
	"reflect"
	"strings"
	"text/template"
	"unicode"
)

// Config contains optional settings to dictate behavior/output
type Config struct {
	Indentation string
	Prefix      string
}

// Generator can inspect a struct type and generate Typescript definitions.
type Generator struct {
	typesDefined    map[string]bool
	indentation     string
	interfacePrefix string
}

// Using custom delimiters here to avoid {} collisions
const interfaceTemplate = `export interface I<<.Prefix>><<.Name>> {<<range .Fields>><<if .Desc>>
<<.Indent>>/**
<<.Indent>> * <<.Desc>>
<<.Indent>> */<<end>>
<<.Indent>><<.Name>>: <<.TypescriptType>>;<<end>>
}`

type fieldTemplateData struct {
	Name           string
	TypescriptType string
	Desc           string
	Indent         string
}

type typeTemplateData struct {
	Name   string
	Prefix string

	Fields []fieldTemplateData
}

var templateInterface *template.Template
var typeMapping map[string]string

func init() {
	templateInterface = template.Must(template.New("interface").Delims("<<", ">>").Parse(interfaceTemplate))

	typeString := "string"
	typeNumber := "number"

	// Go type ==> Typescript type
	typeMapping = map[string]string{
		"string":  typeString,
		"int":     typeNumber,
		"int8":    typeNumber,
		"int16":   typeNumber,
		"int32":   typeNumber,
		"int64":   typeNumber,
		"uint":    typeNumber,
		"uint8":   typeNumber,
		"uint16":  typeNumber,
		"uint32":  typeNumber,
		"uint64":  typeNumber,
		"float32": typeNumber,
		"float64": typeNumber,
	}
}

// New creates a new Generator to use with default behavior
func New() *Generator {
	return NewWithConfig(Config{})
}

// NewWithConfig creates a new Generator to use with configured behavior
func NewWithConfig(cfg Config) *Generator {
	// Handle defaults
	if cfg.Indentation == "" {
		cfg.Indentation = "\t"
	}

	return &Generator{
		typesDefined:    make(map[string]bool),
		indentation:     cfg.Indentation,
		interfacePrefix: cfg.Prefix,
	}
}

// GenerateSingle takes in a single type and returns a full Typescript definition
// based on that type.
func (g *Generator) GenerateSingle(out io.Writer, t interface{}) error {
	r := reflect.TypeOf(t)

	err := g.generateSingle(out, r)

	return err
}

func (g *Generator) generateSingle(out io.Writer, t reflect.Type) error {
	// Already defined earlier, don't redefine
	if g.typesDefined[t.Name()] {
		return nil
	}

	g.typesDefined[t.Name()] = true

	recursiveDefinitions := make([]reflect.Type, 0)

	data := typeTemplateData{
		Name:   t.Name(),
		Prefix: g.interfacePrefix,
	}

	for i := 0; i < t.NumField(); i++ {
		field := t.Field(i)
		fieldName := field.Tag.Get("json")
		canBeUndefined := false
		canBeNull := false

		// Check if it's exported, ignore if not
		if unicode.IsLower(rune(field.Name[0])) {
			continue
		}

		// Skip if it's explicitly set to -
		if fieldName == "-" {
			continue
		}

		if fieldName == "" {
			fieldName = field.Name
		} else {
			split := strings.Split(fieldName, ",")

			for _, s := range split {
				if s == "omitempty" {
					canBeUndefined = true
				}
			}

			fieldName = split[0]
		}

		var fieldTypescriptType string
		var ok bool
		var fieldType = field.Type

		kind := fieldType.Kind()

		if kind == reflect.Ptr {
			canBeNull = true
			fieldType = fieldType.Elem()
			kind = fieldType.Kind()
		}

		switch kind {
		case reflect.Struct:
			fieldTypescriptType = "I" + g.interfacePrefix + fieldType.Name()

			// After we're done, make sure to include this type recursively
			recursiveDefinitions = append(recursiveDefinitions, fieldType)

		case reflect.Interface:
			// Interfaces in Go contain methods, not data fields... this should
			// only really trigger on interface{}, which should be 'any'
			fieldTypescriptType = "any"

		default:
			if fieldTypescriptType, ok = typeMapping[fieldType.Kind().String()]; !ok {
				return errors.New("cannot map typescript type from " + fieldType.Kind().String())
			}
		}

		explicitType := field.Tag.Get("tstype")

		if explicitType != "" {
			fieldTypescriptType = explicitType
		}

		if canBeNull {
			fieldTypescriptType = fieldTypescriptType + " | null"
		}

		if canBeUndefined {
			fieldTypescriptType = fieldTypescriptType + " | undefined"
		}

		data.Fields = append(data.Fields, fieldTemplateData{
			Name:           fieldName,
			TypescriptType: fieldTypescriptType,
			Desc:           field.Tag.Get("tsdesc"),
			Indent:         g.indentation,
		})
	}

	err := templateInterface.Execute(out, data)

	if err != nil {
		return err
	}

	for _, recursive := range recursiveDefinitions {
		if !g.typesDefined[recursive.Name()] {
			out.Write([]byte("\n\n"))
			err := g.generateSingle(out, recursive)

			if err != nil {
				return err
			}
		}
	}

	return nil
}

// GenerateTypes writes all typescript interface definitions to the supplied writer
func (g *Generator) GenerateTypes(out io.Writer, types ...interface{}) error {
	// Store everything in a string to start, combine later for ease of whitespace
	definitions := make([]string, 0, len(types))

	for _, t := range types {
		builder := strings.Builder{}
		err := g.generateSingle(&builder, reflect.TypeOf(t))

		if err != nil {
			return err
		}

		str := builder.String()

		if str != "" {
			definitions = append(definitions, str)
		}
	}

	first := true

	for _, d := range definitions {
		if !first {
			out.Write([]byte("\n\n"))
		}
		out.Write([]byte(d))
		first = false
	}

	return nil
}
