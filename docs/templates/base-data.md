
# Base Data Entities

Here are described, which basic data type is available for all html pages, which are also available in each data package. Every special extension can access these types.

## Structure of the Render Data Type

The Render Data Type is passed to an Html template. During rendering the contents of the data object are merged with the template.

Any extension of the Render Data Type is appended to the Render Object.

## Render Data Types

### Brand

```json
{
  "title": "${string}",
  "logUrl": "${string}"
}
```

### MenuItem

```json
{
  "title": "${string}",
  "pageUrl": "${string}",
  "active": "${boolean}"
}
```

### HtmlData

This is the base interface of all data entities for the rendering

```json
{
  "title": "${string}",
  "brand": "${Brand}",
  "navbar": "${Array<MenuItem>}",
  "footer": "${Array<MenuItem>}"
}
```

