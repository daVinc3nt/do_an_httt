// import { StaffsOperation } from "@/TDLib/tdlogistics";
import Cookies from "js-cookie"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
// const action = new StaffsOperation()
export function Logout(router: AppRouterInstance){
    const confirmDelete = () => {
        return window.confirm("Bạn có muốn là thoát phiên đăng nhập không?");
    };

    // Gọi hàm confirmDelete và lưu kết quả vào biến result
    const result = confirmDelete();
    // Nếu result là true, tức là người dùng nhấn yes
    if (result) {
        // action.logout()
        router.push("/log")
    }
    // Nếu result là false, tức là người dùng nhấn no
    else {
        // Không làm gì cả
    };
}