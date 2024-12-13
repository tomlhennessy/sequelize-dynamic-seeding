'use strict';
const { Musician, Instrument } = require('../models');

const musicianInstruments = [
  {
    musician: { firstName: 'Adam', lastName: 'Appleby' },
    instruments: [{ type: 'piano'}, { type: 'guitar' }]
  },
  {
    musician: { firstName: 'Anton', lastName: 'Martinovic'},
    instruments: [{ type: 'piano' }, { type: 'bass' }]
  },
  {
    musician: { firstName: 'Wilson', lastName: 'Holt' },
    instruments: [{ type: 'cello' }]
  },
  {
    musician: { firstName: 'Marine', lastName: 'Sweet' },
    instruments: [{ type: 'saxophone' }]
  },
  {
    musician: { firstName: 'Georgette', lastName: 'Kubo' },
    instruments: [{ type: 'drums' }, { type: 'trumpet' }, { type: 'saxophone' }]
  },
  {
    musician: { firstName: 'Aurora', lastName: 'Hase' },
    instruments: [{ type: 'violin' }, { type: 'cello' }]
  },
  {
    musician: { firstName: 'Trenton', lastName: 'Lesley' },
    instruments: [{ type: 'piano' }]
  },
  {
    musician: { firstName: 'Camila', lastName: 'Nenci' },
    instruments: [{ type: 'piano' }]
  },
  {
    musician: { firstName: 'Rosemarie', lastName: 'Affini' },
    instruments: [{ type: 'piano' }, { type: 'violin' }]
  },
  {
    musician: { firstName: 'Victoria', lastName: 'Cremonesi' },
    instruments: [{ type: 'violin' }]
  },
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (let entry of musicianInstruments) {
      const { musician, instruments } = entry;

      // find the musician
      const musicianInstance = await Musician.findOne({
        where: {
          firstName: musician.firstName,
          lastName: musician.lastName,
        },
      })

      // find the instruments
      const instrumentInstances = await Instrument.findAll({
        where: {
          [Sequelize.Op.or]: instruments.map((instrument) => ({ type: instrument.type })),
        },
      });

      // associate the musician with the instruments
      if (musicianInstance && instrumentInstances.length > 0) {
        await musicianInstance.addInstruments(instrumentInstances);
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    for (let entry of musicianInstruments) {
      const { musician, instruments } = entry;

      // find the musician
      const musicianInstance = await Musician.findOne({
        where: {
          firstName: musician.firstName,
          lastName: musician.lastName,
        }
      });

      // find the instruments
      const instrumentInstances = await Instrument.findAll({
        where: {
          [Sequelize.Op.or]: instruments.map((instrument) => ({ type: instrument.type })),
        }
      });

      // disassociate the musician from the instruments
      if (musicianInstance && instrumentInstances.length > 0) {
        await musicianInstance.removeInstruments(instrumentInstances);
      }
    }
  },
};
