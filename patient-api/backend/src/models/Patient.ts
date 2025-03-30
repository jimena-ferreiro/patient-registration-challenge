import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

class Patient extends Model {
  public id!: number;
  public fullName!: string;
  public email!: string;
  public phoneCode!: string;
  public phoneNumber!: string;
  public documentPhoto!: string;
}

Patient.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    fullName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    phoneCode: { type: DataTypes.STRING, allowNull: false },
    phoneNumber: { type: DataTypes.STRING, allowNull: false },
    documentPhoto: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    tableName: 'patients',
  }
);

export default Patient;
