const electronics = {
  name: 'electronics',
  type: 'document',
  title: 'Electronics',
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
          { title: 'Smartphones', value: 'smartphones' },
          { title: 'Laptops', value: 'laptops' },
          { title: 'Accessories', value: 'accessories' },
        ],
      },
    },
    {
      name: 'brand',
      type: 'string',
      title: 'Brand', // Marca del producto
    },
  ],
};

export default electronics;