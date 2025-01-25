const express = require('express');
const fs = require('fs');
const addID = require('./middlewares/addID.middleware');
const auth = require('./middlewares/auth.middleware');
const { console } = require('inspector');

const heroRoutes = express.Router();

// Get all heroes
heroRoutes.get('/heroes', (req, res) => {
  try {
    const db = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));
    res.status(200).json(db.heroes);
  } catch (error) {
    res.status(500).json({ err: 'Error retrieving heroes' });
  }
});

// Add a new hero
heroRoutes.post('/add/hero', addID, (req, res) => {
    try {
      const db = JSON.parse(fs.readFileSync('./db.json', 'utf-8')); // Corrected the typo here
      db.heroes.push(req.body);
      fs.writeFileSync('./db.json', JSON.stringify(db, null, 2));
      res.status(201).json(db.heroes);
    } catch (error) {
      res.status(500).json({ err: 'Error adding hero' });
    }
  });
  
  

// Update villain for a hero
heroRoutes.patch('/update/villain/:hero_id', (req, res) => {
  try {
    const { hero_id } = req.params;
    
    const db = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));
    const hero = db.heroes.find((h) => h.id == hero_id);

    if (!hero) {
      return res.status(404).json({ message: 'Hero not found' });
    }

    hero.villains.push(req.body);
    fs.writeFileSync('./db.json', JSON.stringify(db, null, 2));
    res.status(200).json(hero);
  } catch (error) {
    res.status(500).json({ err: 'Error updating villain' });
  }
});

// Delete a hero
heroRoutes.delete('/delete/hero/:hero_id', (req, res) => {
  try {
    const { hero_id } = req.params;
    const db = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));
    const updatedHeroes = db.heroes.filter((h) => h.id != hero_id);

    if (db.heroes.length === updatedHeroes.length) {
      return res.status(404).json({ message: 'Hero not found' });
    }

    db.heroes = updatedHeroes;
    fs.writeFileSync('./db.json', JSON.stringify(db, null, 2));
    res.status(200).json(updatedHeroes);
  } catch (error) {
    res.status(500).json({ err: 'Error deleting hero' });
  }
});

module.exports = { heroRoutes };
