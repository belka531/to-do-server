module.exports = (sequelize, DataTypes) => {
  const Element = sequelize.define("element", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, required: true },
    active: { type: DataTypes.BOOLEAN, required: true }
  });

  return Element;
};