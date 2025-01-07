const game = {
  name: 'game',
  title: 'Games',
  type: 'document',
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
      name: 'platform',
      type: 'string',
      title: 'Platform',
      options: {
        list: [
          { title: 'PC', value: 'pc' },
          { title: 'PlayStation', value: 'playstation' },
          { title: 'Xbox', value: 'xbox' },
          { title: 'Nintendo Switch', value: 'nintendo-switch' },
        ],
      },
    },
    {
      name: 'downloadLink',
      type: 'url',
      title: 'Download Link', // Enlace de descarga del juego
    },
  ],
}

export default game