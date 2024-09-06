import { validation } from 'sanity';

export default {
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'rating',
      title: 'Enter a Rating from (1-5 stars)',
      type: 'number',
      validation: (Rule) =>
        Rule.required().min(1).max(5).error('Please enter a value between 1 and 5'),
    },
    {
      name: 'restaurant_description',
      title: 'Restaurant Description',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    },
    {
      name: 'dishes',
      title: 'Dishes',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'dishes' }] }],
    },
    {
      name: 'latitude',
      title: 'Latitude',
      type: 'number',
      validation: (Rule) =>
        Rule.required()
          .min(-90)
          .max(90)
          .error('Latitude must be between -90 and 90'),
    },
    {
      name: 'longitude',
      title: 'Longitude',
      type: 'number',
      validation: (Rule) =>
        Rule.required()
          .min(-180)
          .max(180)
          .error('Longitude must be between -180 and 180'),
    },
  ],
};
