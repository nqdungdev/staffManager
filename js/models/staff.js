//3. Tạo đối tượng nhân viên
function Staff(
  id,
  name,
  email,
  password,
  datePicker,
  basicSalary,
  position,
  workTime
) {
  this.id = id;
  this.name = name;
  this.email = email;
  this.password = password;
  this.datePicker = datePicker;
  this.basicSalary = basicSalary;
  this.position = position;
  this.workTime = workTime;
  //5. Xây dựng phương thức tính tổng lương cho đối tượng nhân viên
  this.totalSalary = function () {
    if (this.position === "Sếp") {
      return this.basicSalary * 3;
    }
    if (this.position === "Trưởng phòng") {
      return this.basicSalary * 2;
    }
    return this.basicSalary;
  };

  //6. Xây dựng phương thức xếp loại cho đối tượng nhân viên
  this.rank = function () {
    if (this.workTime >= 192) return "Nhân viên xuất sắc";
    if (this.workTime >= 176) return "Nhân viên giỏi";
    if (this.workTime >= 160) return "Nhân viên khá";
    return "Nhân viên trung bình";
  };
}
