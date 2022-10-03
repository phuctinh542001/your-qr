const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const configForm = $('.qr__config');
const configBtn = $('.config__btn');
const configContent = $$('.config__content');

let qrInputUrl;
let qrInputImg;
let lineActiveWidth;
// Function 


// Envets Listener

// Sự kiện chuyển tab 
const configTitle = $$('.config__title');
const configTitleLine = $('.config__line--active');

window.addEventListener('load', () => {
    lineActiveWidth = Number($('.qr__config').offsetWidth) / 5;
    configTitleLine.style.width = lineActiveWidth + 'px';
    console.log(lineActiveWidth)
})

configTitle.forEach((title, index) => {
    title.addEventListener('click', () => {

        if (!title.classList.contains('active')) {
            
            $('.config__title.active').classList.remove('active');
            title.classList.add('active');
            
            configTitleLine.style.left = `${lineActiveWidth * index}px`;
            configTitleLine.style.width = `${lineActiveWidth}px`;
            
            $('.config__content.active').classList.remove('active');
            configContent[index].classList.add('active');
        }
    })
});

// Sự kiện chọn kiểu màu
const colorType = $$('.color__type');
colorType.forEach((item, index) => {
    item.addEventListener('change', () => {
        if (item.value === 'color-type-single') {
            const dotsTypeItem = $$(`.${item.id}-single`);
            for (let i = 0; i < dotsTypeItem.length; i++) {
                dotsTypeItem[i].style.display = 'flex';
            }
            
            const dotsTypeItemHide = $$(`.${item.id}-gradient`);
            for (let i = 0; i < dotsTypeItemHide.length; i++) {
                dotsTypeItemHide[i].style.display = 'none';
            }
        } else {
            const dotsTypeItem = $$(`.${item.id}-single`);
            for (let i = 0; i < dotsTypeItem.length; i++) {
                dotsTypeItem[i].style.display = 'none';
            }
            
            const dotsTypeItemHide = $$(`.${item.id}-gradient`);
            for (let i = 0; i < dotsTypeItemHide.length; i++) {
                dotsTypeItemHide[i].style.display = 'flex';
            }
    
        }
    })
})

// Sự kiện cập nhật URL vào QR code
const formUrl = $('.form__main');
formUrl.querySelector('button').addEventListener('click', (e) => {
    e.preventDefault();

    const qrCodeEl = $('#qr__code');
    qrCodeEl.innerHTML = '';
    
    qrInputUrl = formUrl.querySelector('input').value;
    const qrCode = new QRCodeStyling({
        width: 300,
        height: 300,
        type: "svg",
        data: qrInputUrl,
    });

    qrCode.append(qrCodeEl);
})

// Sự kiện cập nhập tùy chỉnh cho QR code
const btnApply = $('.qr__apply');
btnApply.addEventListener('click', () => {
    const configFormData = new FormData(configForm);

    if ($('input[type="file"]#qr-image-file').files[0]) {
        qrInputImg = URL.createObjectURL($('input[type="file"]#qr-image-file').files[0]);
    } else {
        qrInputImg = null;
    }

    const qrGeneralImg = {
        width: Number(configFormData.get('qr-width')),
        height: Number(configFormData.get('qr-height')),
        type: "svg",
        data: qrInputUrl,
        margin: Number(configFormData.get('qr-margin')),
        qrOptions: {
            typeNumber: Number(configFormData.get('qr-type-number')),
            mode: configFormData.get('qr-mode'),
            errorCorrectionLevel: "Q"
        },
        image: qrInputImg,
        imageOptions: {
            hideBackgroundDots: configFormData.get('qr-image-hide-dots') ? true : false,
            imageSize: Number(configFormData.get('qr-image-size')),
            margin: Number(configFormData.get('qr-image-margin'))
        }
    };

    let qrDotsOption = {};
    let qrCornersSquareOptions = {};
    let qrCornersDotsOptions = {};
    let qrBackgroundOptions = {};

    if (configFormData.get('qr-dots-color') === 'color-type-single') {
        qrDotsOption = {
            dotsOptions: {
                type: configFormData.get('qr-dots-type'),
                color: configFormData.get('qr-dots-color-single-color')
            }
            
        }
    } else {
        qrDotsOption = {
            dotsOptions: {
                type: configFormData.get('qr-dots-type'),
                gradient: {
                    type: configFormData.get('qr-dots-color-gradient-type'),
                    rotation: (Math.PI * Number(configFormData.get('qr-dots-color-gradient-rotation')) / 180),
                    colorStops: [
                        {
                            offset: 0,
                            color: configFormData.get('qr-dots-color-gradient-color1')
                        },
                        {
                            offset: 1,
                            color: configFormData.get('qr-dots-color-gradient-color2')
                        }
                    ]
                }
            }
        } 
    }

    if (configFormData.get('qr-corners-square-color') === 'color-type-single') {
        qrCornersSquareOptions = {
            cornersSquareOptions: {
                type: configFormData.get('qr-corners-square-type'),
                color: configFormData.get('qr-corners-square-color-single-color')
            }
            
        }
    } else {
        qrCornersSquareOptions = {
            cornersSquareOptions: {
                type: configFormData.get('qr-corners-square-type'),
                gradient: {
                    type: configFormData.get('qr-corners-square-color-gradient-type'),
                    rotation: (Math.PI * Number(configFormData.get('qr-corners-square-color-gradient-rotation')) / 180),
                    colorStops: [
                        {
                            offset: 0,
                            color: configFormData.get('qr-corners-square-color-gradient-color1')
                        },
                        {
                            offset: 1,
                            color: configFormData.get('qr-corners-square-color-gradient-color2')
                        }
                    ]
                }
            }
        } 
    }

    if (configFormData.get('qr-corners-dots-color') === 'color-type-single') {
        qrCornersDotsOptions = {
            cornersDotOptions: {
                type: configFormData.get('qr-corners-dots-type'),
                color: configFormData.get('qr-corners-dots-color-single-color')
            }
            
        }
    } else {
        qrCornersDotsOptions = {
            cornersDotOptions: {
                type: configFormData.get('qr-corners-dots-type'),
                gradient: {
                    type: configFormData.get('qr-corners-dots-color-gradient-type'),
                    rotation: (Math.PI * Number(configFormData.get('qr-corners-dots-color-gradient-rotation')) / 180),
                    colorStops: [
                        {
                            offset: 0,
                            color: configFormData.get('qr-corners-dots-color-gradient-color1')
                        },
                        {
                            offset: 1,
                            color: configFormData.get('qr-corners-dots-color-gradient-color2')
                        }
                    ]
                }
            }
        } 
    }

    if (configFormData.get('qr-background-color') === 'color-type-single') {
        qrBackgroundOptions = {
            backgroundOptions: {
                color: configFormData.get('qr-background-color-single-color')
            }
            
        }
    } else {
        qrBackgroundOptions = {
            backgroundOptions: {
                gradient: {
                    type: configFormData.get('qr-background-color-gradient-type'),
                    rotation: (Math.PI * Number(configFormData.get('qr-background-color-gradient-rotation')) / 180),
                    colorStops: [
                        {
                            offset: 0,
                            color: configFormData.get('qr-background-color-gradient-color1')
                        },
                        {
                            offset: 1,
                            color: configFormData.get('qr-background-color-gradient-color2')
                        }
                    ]
                }
            }
        } 
    }

    const qrData = {...qrGeneralImg, ...qrDotsOption, ...qrCornersSquareOptions, ...qrCornersDotsOptions, ...qrBackgroundOptions}

    console.log(qrData);

    const qrCode = new QRCodeStyling(qrData);

    const qrCodeEl = $('#qr__code');
    qrCodeEl.innerHTML = '';

    qrCode.append(qrCodeEl);
})

$('.config__content input').addEventListener('change', () => {
    console.log('hello');
})

$('.config__content select').addEventListener('change', () => {
    console.log('hello');
})

// const qrCode = new QRCodeStyling({
//     width: 300,
//     height: 300,
//     type: "svg",
//     data: "https://www.facebook.com/",
//     image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
//     dotsOptions: {
//         color: "#000",
//         type: "rounded"
//     },
//     backgroundOptions: {
//         color: "#fff",
//     },
//     imageOptions: {
//         crossOrigin: "anonymous",
//         margin: 20
//     }
// });
