const projectsCollection = async (db) => {
  const collection = db.collection('projects ');
  return collection;
};

module.exports = projectsCollection;
