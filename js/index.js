var staffList = [];

//1. In ra table danh sách nhân viên
var renderTable = function (data) {
  var divHtml = "";
  var data = data || staffList;
  for (var i = 0; i < data.length; i++) {
    divHtml += `
    <tr>
      <td>${data[i].id}</td>
      <td>${data[i].name}</td>
      <td>${data[i].email}</td>
      <td>${data[i].datePicker}</td>
      <td>${data[i].position}</td>
      <td>${data[i].totalSalary()}</td>
      <td>${data[i].rank()}</td>
      <td>
        <button class="btn btn-success" onclick="getStaff('${
          staffList[i].id
        }')" data-toggle="modal" data-target="#myModal">Cập nhật</button>
        <button class="btn btn-danger" onclick="deleteStaff('${
          staffList[i].id
        }')">Xóa</button>
      </td>
    </tr>
    `;
  }
  document.getElementById("tableDanhSach").innerHTML = divHtml;
};

//------------------------------------------------------------------------------
var mapData = function (dataFromLocal) {
  var data = [];
  for (var i = 0; i < dataFromLocal.length; i++) {
    var currentStaff = dataFromLocal[i];
    var mappedStaff = new Staff(
      currentStaff.id,
      currentStaff.name,
      currentStaff.email,
      currentStaff.password,
      currentStaff.datePicker,
      currentStaff.basicSalary,
      currentStaff.position,
      currentStaff.workTime
    );
    data.push(mappedStaff);
  }
  return data;
};

//------------------------------------------------------------------------------
var saveData = function () {
  localStorage.setItem("staffList", JSON.stringify(staffList));
};

var loadData = function () {
  if (localStorage.getItem("staffList")) {
    staffList = mapData(JSON.parse(localStorage.getItem("staffList")));
    renderTable();
  }
};

loadData();

//------------------------------------------------------------------------------
//2. Thêm nhân viên mới
document.getElementById("btnThem").addEventListener("click", () => {
  document.getElementById("tknv").disabled = false;
  document.getElementById("btnReset").click();
  document.getElementById("btnThemNV").style.display = "block";
  document.getElementById("btnCapNhat").style.display = "none";
});

var createStaff = function () {
  var alerts = document.getElementsByClassName("sp-thongbao");
  for (var alert of alerts) {
    alert.style.display = "none";
  }

  if (
    !validation() ||
    !checkId(document.getElementById("tknv").value, "tbTKNV")
  ) {
    return;
  }
  // if (!checkId(document.getElementById("tknv").value, "tbTKNV")) {
  //   return;
  // }
  var id = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var datePicker = document.getElementById("datepicker").value;
  var basicSalary = +document.getElementById("luongCB").value;
  var position = document.getElementById("chucvu").value;
  var workTime = +document.getElementById("gioLam").value;

  var newStaff = new Staff(
    id,
    name,
    email,
    password,
    datePicker,
    basicSalary,
    position,
    workTime
  );
  staffList.push(newStaff);
  saveData();
  renderTable();

  document.getElementById("btnReset").click();
  document.getElementById("btnDong").click();
};

document.getElementById("btnDong").addEventListener("click", () => {
  document.getElementById("tknv").disabled = false;
  document.getElementById("btnReset").click();
});

//------------------------------------------------------------------------------
//4. Validation
var validation = function () {
  var id = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var datePicker = document.getElementById("datepicker").value;
  var basicSalary = document.getElementById("luongCB").value;
  var position = document.getElementById("chucvu").value;
  var workTime = document.getElementById("gioLam").value;

  var textPattern =
    /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;

  var numberPattern = /^[0-9]+$/;

  var emailPattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  var passwordPattern =
    /^(?=.*?[A-Z])(?=(.*[a-z]){0,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{6,10}$/;

  var datePattern =
    /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/;

  var alerts = document.getElementsByClassName("sp-thongbao");
  for (var alert of alerts) {
    alert.style.display = "inline-block";
  }

  var isValid = true;
  isValid &= required(id, "tbTKNV") && length(id, "tbTKNV", 4, 6);
  isValid &= required(name, "tbTen") && pattern(name, "tbTen", textPattern);

  isValid &=
    required(email, "tbEmail") && pattern(email, "tbEmail", emailPattern);

  isValid &=
    required(password, "tbMatKhau") &&
    length(password, "tbMatKhau", 6, 10) &&
    pattern(
      password,
      "tbMatKhau",
      passwordPattern,
      "Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt!"
    );

  isValid &=
    required(datePicker, "tbNgay") &&
    pattern(datePicker, "tbNgay", datePattern);

  isValid &=
    required(basicSalary, "tbLuongCB") &&
    pattern(basicSalary, "tbLuongCB", numberPattern) &&
    value(basicSalary, "tbLuongCB", 1e6, 20e6);

  isValid &= checkSelect(position, "tbChucVu", "Vui lòng chọn chức vụ hợp lệ!");

  isValid &=
    required(workTime, "tbGiolam") &&
    pattern(workTime, "tbGiolam", numberPattern) &&
    value(workTime, "tbGiolam", 80, 200);

  return isValid;
};

var required = function (value, spanId, message) {
  if (!value) {
    document.getElementById(spanId).innerHTML =
      message || `* Trường này không được để trống!`;
    return false;
  }
  document.getElementById(spanId).innerHTML = ``;
  return true;
};

var length = function (value, spanId, min, max, message) {
  if (value.length < min || value.length > max) {
    document.getElementById(spanId).innerHTML =
      message || `* Độ dài phải từ ${min} đến ${max} kí tự!`;
    return false;
  }
  document.getElementById(spanId).innerHTML = ``;
  return true;
};

var pattern = function (value, spanId, regex, message) {
  if (!regex.test(value)) {
    document.getElementById(spanId).innerHTML =
      message || `* Không đúng định dạng!`;
    return false;
  }
  document.getElementById(spanId).innerHTML = ``;
  return true;
};

var value = function (value, spanId, min, max, message) {
  if (value < min || value > max) {
    document.getElementById(spanId).innerHTML =
      message || `* Giá trị từ ${min} đến ${max}!`;
    return false;
  }
  document.getElementById(spanId).innerHTML = ``;
  return true;
};

var checkSelect = function (value, spanId, message) {
  if (value === document.getElementById("chucvu").options[0].value) {
    document.getElementById(spanId).innerHTML =
      message || `* Lựa chọn không hợp lệ!`;
    return false;
  }
  document.getElementById(spanId).innerHTML = ``;
  return true;
};

var checkId = function (id, spanId, message) {
  for (var i = 0; i < staffList.length; i++) {
    if (id === staffList[i].id) {
      document.getElementById(spanId).innerHTML =
        message || `* Tài khoản đã tồn tại!`;
      return false;
    }
  }
  document.getElementById(spanId).innerHTML = ``;
  return true;
};

//------------------------------------------------------------------------------
var findById = function (id) {
  for (var i = 0; i < staffList.length; i++) {
    if (id === staffList[i].id) {
      return i;
    }
  }
  return -1;
};

//------------------------------------------------------------------------------
//7. Xóa nhân viên
var deleteStaff = function (id) {
  var index = findById(id);
  if (index === -1) {
    alert("* Nhân viên không tồn tại");
    return;
  }
  staffList.splice(index, 1);
  saveData();
  renderTable();
};

//------------------------------------------------------------------------------
//8. Cập nhật nhân viên (có validate)
var getStaff = function (id) {
  var alerts = document.getElementsByClassName("sp-thongbao");
  for (var alert of alerts) {
    alert.style.display = "none";
  }
  var index = findById(id);
  if (index === -1) {
    alert("Nhân viên không tồn tại");
    return;
  }

  document.getElementById("tknv").value = staffList[index].id;
  document.getElementById("name").value = staffList[index].name;
  document.getElementById("email").value = staffList[index].email;
  document.getElementById("password").value = staffList[index].password;
  document.getElementById("datepicker").value = staffList[index].datePicker;
  document.getElementById("luongCB").value = staffList[index].basicSalary;
  document.getElementById("chucvu").value = staffList[index].position;
  document.getElementById("gioLam").value = staffList[index].workTime;

  document.getElementById("tknv").disabled = true;
  document.getElementById("btnThemNV").style.display = "none";
  document.getElementById("btnCapNhat").style.display = "block";
  // document.getElementById("btnReset").click();
  // document.getElementById("btnDong").click();
};

var updateStaff = function () {
  if (!validation()) {
    return;
  }
  var id = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var datePicker = document.getElementById("datepicker").value;
  var basicSalary = +document.getElementById("luongCB").value;
  var position = document.getElementById("chucvu").value;
  var workTime = +document.getElementById("gioLam").value;

  var index = findById(id);
  if (index === -1) {
    alert("Nhân viên không tồn tại");
    return;
  }

  var updateStaff = new Staff(
    id,
    name,
    email,
    password,
    datePicker,
    basicSalary,
    position,
    workTime
  );

  staffList[index] = updateStaff;

  document.getElementById("btnDong").click();
  saveData();
  renderTable();
};

//------------------------------------------------------------------------------
//9. Tìm Nhân Viên theo loại (xuất săc, giỏi, khá...)
var searchStaff = function () {
  var keyword = document.getElementById("searchName").value;
  var results = [];
  for (var i = 0; i < staffList.length; i++) {
    var staffRank = staffList[i].rank().toLowerCase();
    if (staffRank.includes(keyword)) {
      results.push(staffList[i]);
    }
  }
  renderTable(results);
};

document.getElementById("btnTimNV").addEventListener("click", () => {
  if (document.getElementById("searchName").value === "") {
    alert("Vui lòng nhập loại nhân viên bạn muốn tìm!");
  }
});
