const dbPool = require("../db");

class MahasiswaModel {
  get = () => dbPool.query("SELECT * FROM mahasiswa");
  find = (params) => dbPool.query("SELECT * FROM mahasiswa WHERE ?", params);
  create = (params) => dbPool.query("INSERT INTO mahasiswa SET ?", params);
  update = (params, id) => dbPool.query(`UPDATE mahasiswa SET ? WHERE nim = ${id}`, params);
  delete = (params) => dbPool.query(`DELETE FROM mahasiswa WHERE ?`, params);
}
module.exports = new MahasiswaModel();
