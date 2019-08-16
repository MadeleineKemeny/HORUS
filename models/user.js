module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      phoneNum: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [5]
        }
      },
      consent: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      }
    });

    User.associate = function(models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      User.hasMany(models.Sensor, {
        onDelete: "cascade"
      });
    };

    return User;
  };