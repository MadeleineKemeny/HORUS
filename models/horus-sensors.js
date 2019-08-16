module.exports = function(sequelize, DataTypes) {
    var Sensor = sequelize.define("Sensor", {
      sensorType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sensorStatus: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      }
    });
  
    Sensor.associate = function(models) {
      // We're saying that a Sensor should belong to an Author
      // A Sensor can't be created without an Author due to the foreign key constraint
      Sensor.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Sensor;
  };
  