(function (app) {
    app.filter('statusFilter', function () {
        return function (input) {
            if (input == true)
                return 'Kích hoạt';
            else
                return 'Khóa';
        }
    });

    app.filter('statusLevel', function () {
        return function (input) {
            if (input == 2)
                return 'Trung Tâm';
            else if (input == 3)
                return 'Chi cục';
            else if (input == 4)
                return 'Đơn vị cơ sở'
            else if(input == 1)
                return 'Tổng cục'
            else if(input == 5)
                    return 'Nhập liệu DVCS'
            else
                return 'N/a';
        }
    });

    app.filter('trangthaiphieu', function () {
        return function (input) {
            if (input == true)
                return 'Đã nhận';
            else
                return 'Chưa nhận';
        }
    });

    app.filter('trangthaimau', function () {
        return function (input) {
            if (input == 1)
                return 'Đã tiếp nhận';
            else if (input == 2)
                return 'Đã đánh giá';
            else if (input == 3)
                return 'Đã vào phòng xét nghiệm';
            else if (input == 4)
                return 'Đã có kết quả';
            else if (input == 5)
                return 'Mẫu làm xét nghiệm lần 2';
            else if (input == 6)
                return 'Mẫu chỉ định thu lại';
            else if (input == 7)
                return 'Đã thu lại mẫu'
            else
                return 'Na/Na';
        }
    });

    app.filter('menu', function () {
        return function (input) {
            if (input == 1)
                return 'menu_tiepnhan';
            else if (input == 2)
                return 'menu_quantrithanhvien';
            else if (input == 3)
                return 'dichvu';
            else if (input == 4)
                return 'menu_goidvchung';
            else if (input == 5)
                return 'menu_chitietgoidv';
            else if (input == 6)
                return 'menu_danhgiachatluong';
            else if (input == 7)
                return 'menu_kythuatxn';
            else if (input == 8)
                return 'menu_thongsoxn';
            else if (input == 9)
                return 'menu_trungtam';
            else if (input == 10)
                return 'menu_chicuc';
            else if (input == 11)
                return 'menu_donvicoso';
            else if (input == 12)
                return 'menu_chuongtrinh';
        }
    })
})(angular.module('ocms.common'));