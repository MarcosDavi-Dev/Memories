const Memory = require("../models/Memory");

const createMemory = async (req, res) => {
  try {
    const { title, description } = req.body;

    const src = `image/${req.file.filename}`;

    if (!title || !description) {
      return res
        .status(400)
        .json({ msg: "Por favor, preencha todos os campos." });
    }

    const newMemory = new Memory({
      title,
      src,
      description,
    });

    await newMemory.save();

    res.json({ msg: "Memória criada com sucesso!", newMemory });
  } catch (error) {
    console.log(error.mensage);
    res.status(500).send("Ocorreu um erro!");
  }
};

const getMemories = async (req, res) => {
  try {
    const memories = await Memory.find();
  } catch (error) {
    res.status(500).send("Ocorreu um erro!");
  }
};

const getMemory = async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);

    if (!memory) {
      return res.status(404).json({ msg: "Memória não encontrada." });
    }

    res.json(memory);
  } catch (error) {
    res.status(500).send("Ocorreu um erro!");
  }
};

module.exports = {
  createMemory,
  getMemories,
  getMemory,
};
