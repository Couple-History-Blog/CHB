import Swal from "sweetalert2";
import ko from '../assets/language/ko.json';
import '../assets/scss/style.scss';

const KOR_LOGIN_MESSAGE = ko['sign-in'];

export const errorSweetAlert = (errMsg: string, alertType: string) => {
    console.log("open error alert!!");
    console.log("errMsg --> ", errMsg);
    console.log("alertType --> ", alertType);
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
        customClass: {
            container: 'swal-toast-container'
        }
    })

    // TODO: alertType 별로 message return하는 util

    Toast.fire({
        icon: 'error',
        title: errMsg
    });
}

export const successSweetAlert = (sucMsg: string, alertType: string) => {
    console.log("open success alert!!");
    console.log("sucMsg --> ", sucMsg);
    console.log("alertType --> ", alertType);
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
            // toast.style.zIndex = String(10000); // 원하는 Z-인덱스 값으로 설정
        },
        customClass: {
            container: 'swal-toast-container' // 앞서 정의한 CSS 클래스 이름을 여기에 지정
        }
    });

    Toast.fire({
        icon: 'success',
        title: sucMsg
    });
}