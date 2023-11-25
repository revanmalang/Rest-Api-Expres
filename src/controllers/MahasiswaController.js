const mhsModel = require("../models/MahasiswaModels.js");
class MahasiswaController {
  getAll = async (req, res) => {
    const [data] = await mhsModel.get();
    if (data.length > 0)
      res.send({ status: true, message: "Data ditemukan", data: data });
    else res.send({ status: false, message: "Data kosong" });
  };
  findById = async (req, res) => {
    const { id } = req.params;
    const [data] = await mhsModel.find({ nim: id });
    if (data.length > 0)
      res.send({ status: true, message: "Data ditemukan", data: data });
    else res.send({ status: false, message: "Data kosong" });
  };

  create = async (req, res) => {
    const { body } = req;
    try {
      if (!(body.nim && body.nama && body.alamat && body.prodi))
        throw Error("DATA TIDAK LENGKAP");

      const data = {
        nim: body.nim,
        nama_mhs: body.nama,
        alamat_mhs: body.alamat,
        prodi: body.prodi,
      };

      const result = await mhsModel.create(data);
      if (result[0]?.affectedRows > 0)
        res.send({
          status: true,
          message: "Data berhasil ditambahkan",
          data: data,
        });
      else res.status(500).send({ status: false, message: "Input data gagal" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ status: false, message: "Input data gagal " + error?.message });
    }
  };

  update = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const [data] = await mhsModel.find({ nim: id });
    if (data.length == 0)
      res.send({ status: false, message: "Data Tidak Ditemukan" });
    try {
      const newData = {
        nama_mhs: (body.nama ? body.nama : data.nama_mhs),
        alamat_mhs: (body.alamat ? body.alamat : data.alamat_mhs),
        prodi: (body.prodi ? body.prodi : data.prodi)
      }
      const result = await mhsModel.update(newData, id);
      if (result[0]?.affectedRows > 0)
        res.send({
          status: true,
          message: "Data berhasil Diupdate",
          data: newData,
        });
      else res.status(500).send({ status: false, message: "Input data gagal" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ status: false, message: "Edit data gagal " + error?.message });
    }

  }

  delete = async (req, res) => {
    const { id } = req.params;
    const [data] = await mhsModel.find({ nim: id });
    if (data.length == 0)
      res.send({ status: true, message: "Data tidak ditemukan" });
    try {
      const result = await mhsModel.delete({ nim: id });
      if (result[0]?.affectedRows > 0)
        res.send({
          status: true,
          message: "Data berhasil dihapus",
          data: data,
        });
      else res.status(500).send({ status: false, message: "hapus data gagal" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ status: false, message: "Input data gagal " + error?.message });
    }
  }

}
module.exports = new MahasiswaController();
