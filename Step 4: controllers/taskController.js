const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/tasks.json");

const readData = () => JSON.parse(fs.readFileSync(filePath));
const writeData = (data) =>
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

exports.getTasks = (req, res) => {
  const tasks = readData();
  res.json(tasks);
};

exports.addTask = (req, res) => {
  const tasks = readData();
  const newTask = {
    id: Date.now(),
    title: req.body.title,
    status: "Pending"
  };
  tasks.push(newTask);
  writeData(tasks);
  res.status(201).json(newTask);
};

exports.updateTask = (req, res) => {
  const tasks = readData();
  const task = tasks.find(t => t.id == req.params.id);

  if (!task) return res.status(404).json({ message: "Task not found" });

  task.status = req.body.status || task.status;
  writeData(tasks);
  res.json(task);
};

exports.deleteTask = (req, res) => {
  let tasks = readData();
  tasks = tasks.filter(t => t.id != req.params.id);
  writeData(tasks);
  res.json({ message: "Task deleted" });
};
