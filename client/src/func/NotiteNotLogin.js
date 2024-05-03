import Swal from "sweetalert2";
export function NotLogin() {
  Swal.fire({
    title: "Bạn Chưa Đăng Nhập?",
    text: "Hãy Đăng Nhập Ngay",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Để sau",
    confirmButtonText: "Đăng Nhập",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "/login";
    }
  });
}
