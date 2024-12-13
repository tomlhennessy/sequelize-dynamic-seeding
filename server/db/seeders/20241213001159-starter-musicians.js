'use strict';
const { Band, Musician } = require('../models');

// define the data source
const bandMusicians = [
  {
    name: 'The Falling Box',
    musicians: [
      { firstName: 'Adam', lastName: 'Appleby'},
      { firstName: 'Anton', lastName: 'Martinovic'},
      { firstName: 'Wilson', lastName: 'Holt'}
    ]
  },
  {
    name: 'America The Piano',
    musicians: [
      { firstName: 'Marine', lastName: 'Sweet'},
      { firstName: 'Georgette', lastName: 'Kubo' }
    ]
  },
  {
    name: 'Loved Autumn',
    musicians: [
      { firstName: 'Aurora', lastName: 'Hase' }
    ]
  },
  {
    name: 'Playin Sound',
    musicians: [
      { firstName: 'Trenton', lastName: 'Lesley' },
      { firstName: 'Camila', lastName: 'Nenci' }
    ]
  },
  {
    name: 'The King River',
    musicians: [
      { firstName: 'Rosemarie', lastName: 'Affini' },
      { firstName: 'Victoria', lastName: 'Cremonesi' }
    ]
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (let band of bandMusicians) {
      const { name, musicians } = band;

      // find the band by name
      const bandInstance = await Band.findOne({ where: { name }});

      if (bandInstance) {
        // use hasMany association to create musicians
        for (let musician of musicians) {
          await bandInstance.createMusician(musician);
        }
      } else {
        console.error(`Band not found: ${name}`);
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    for (let band of bandMusicians) {
      const { musicians } = band;

      // delete each musician
      for (let musician of musicians) {
        await Musician.destroy({ where: { ...musician } });
      }
    }
  }
};
