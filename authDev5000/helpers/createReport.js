const Excel = require("exceljs");

const todoServices = require("../services/todoServices");

const createReport = res => {
  let workbook = new Excel.Workbook();
  let worksheet = workbook.addWorksheet("report");
  worksheet.columns = [
    { header: "Tasks", key: "task", width: 20 },
    { header: "Users", key: "user", width: 20 },
    { header: "Status", key: "status", width: 20 },
    { header: "Priority", key: "priority", width: 20 },
    { header: "Investigation", key: "investigation", width: 20 },
    { header: "On fact", key: "onfact", width: 20 },
    { header: "Start Date", key: "start", width: 20 },
    { header: "End Date", key: "end", width: 20 }
  ];
  const userColumn = worksheet.getColumn("user");
  const taskColumn = worksheet.getColumn("task");
  const investigationColumn = worksheet.getColumn("investigation");
  const onfactColumn = worksheet.getColumn("onfact");
  const statusColumn = worksheet.getColumn("status");
  const priorityColumn = worksheet.getColumn("priority");
  const endColumn = worksheet.getColumn("end");
  const startColumn = worksheet.getColumn("start");
  return todoServices
    .find()
    .populate(["todoOwner", "priority"])
    .exec((err, todos) => {
      let arrayUsername = ["Users"];
      let arrayTask = ["Tasks"];
      let arrayInv = ["Investigation"];
      let arrayOnFact = ["On Fact"];
      let arrayStatus = ["Status"];
      let arrayPriority = ["Priority"];
      let arrayEnd = ["End Date"];
      let arrayStart = ["Start Date"];
      todos.forEach(todo => {
        arrayTask.push(todo.task);
        arrayInv.push(todo.timeTracking.investigation);
        arrayOnFact.push(todo.timeTracking.onFact);
        arrayUsername.push(todo.todoOwner.username);
        arrayStatus.push(todo.status);
        arrayPriority.push(todo.priority.value);
        arrayEnd.push(todo.dates.end);
        arrayStart.push(todo.dates.start);
      });
      startColumn.values = arrayStart;
      endColumn.values = arrayEnd;
      userColumn.values = arrayUsername;
      taskColumn.values = arrayTask;
      investigationColumn.values = arrayInv;
      onfactColumn.values = arrayOnFact;
      statusColumn.values = arrayStatus;
      priorityColumn.values = arrayPriority;
      res.setHeader("Content-Type", "application/vnd.ms-excel;");
      res.setHeader("Content-disposition", `attachment;filename=report.xls`);
      return workbook.xlsx.write(res).then(end => {
        return res.end();
      });
    });
};

module.exports = createReport;
