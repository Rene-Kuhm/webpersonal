export default {
    name: 'template',
    type: 'document',
    title: 'Template',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Name',
      },
      {
        name: 'slug',
        type: 'slug',
        title: 'Slug',
        options: {
          source: 'name',
          maxLength: 96,
        },
      },
      {
        name: 'description',
        type: 'text',
        title: 'Description',
      },
      {
        name: 'price',
        type: 'number',
        title: 'Price',
      },
      {
        name: 'image',
        type: 'image',
        title: 'Image',
        options: {
          hotspot: true, // Permite recortar la imagen
        },
      },
      {
        name: 'category',
        type: 'string',
        title: 'Category',
        options: {
          list: [
            { title: 'Web Templates', value: 'web-templates' },
            { title: 'UI Components', value: 'ui-components' },
            { title: 'Plugins', value: 'plugins' },
          ],
        },
      },
      {
        name: 'file',
        type: 'file',
        title: 'File', // Archivo descargable (por ejemplo, un .zip)
      },
    ],
  };