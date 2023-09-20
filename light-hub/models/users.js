import { Schema, model, models } from "mongoose";

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email es requerida",
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Email no es valido",
    ],
  },
  password: {
    type: String,
    required: [true, "Contraseña es requerida"],
    selecet: false,
    minLength: [8, "Minimo de caracteres es 8"],
  },
  fullname: {
    type: String,
    required: [true, "Nombre es requerido"],
    minLength: [3, "Minimo de caracteres es 3"],
  },
});
const userModel = models.User || model("User", userSchema);
export default userModel;
