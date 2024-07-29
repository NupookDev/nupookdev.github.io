const outsideThing = document.getElementById("main");

{
    console.log("%cผมเขียนทั้งหมดเอง", "font-size: 4rem; color: white; -webkit-text-stroke: 0.1rem black;");

    const startMenu = document.getElementById("start-bar");
    const menuBtn = document.getElementById("menu");

    let startMenuOpen = 0;
    let menuBtnDown = 0;

    function closeStart() {
        outsideThing.removeEventListener("mousedown", closeStart);
        startMenuOpen = 0;
        startMenu.style.display = "none";
        menuBtnDown = 0;
    }

    menuBtn.addEventListener("mousedown", () => {
        menuBtnDown = 1
    });

    menuBtn.addEventListener("mouseup", () => {
        if (menuBtnDown == 1) {
            menuBtnDown = 0;

            if (startMenuOpen == 0) {
                startMenuOpen = 1;
                startMenu.style.display = "grid";
                outsideThing.addEventListener("mousedown", closeStart);
                return;
            }

            startMenuOpen = 0;
            startMenu.style.display = "none";
        }
    });
}

{
    const timeDisplays = document.getElementById("time").children;
    const currentHourText = timeDisplays[0];
    const currentDateText = timeDisplays[1];

    let currentTime;

    function getNumStr(num) {
        if (num < 10) {
            return `0${num}`;
        }

        return num;
    }

    setInterval(() => {
        currentTime = new Date();
        currentHourText.textContent = `${getNumStr(currentTime.getHours())}:${getNumStr(currentTime.getMinutes())}`;
        currentDateText.textContent = `${currentTime.getDate()}/${currentTime.getMonth()}/${currentTime.getFullYear() + 543}`;
    }, 1000)
}

{
    const TEXT_ICO = "images/text.png";
    const PIC_ICO = "images/picture-ico.png"

    const FOLDERS_DATA = [
        [
            [
                TEXT_ICO,
                "เกียวกับผม",
                "images/website - about me.png"
            ],
            [
                TEXT_ICO,
                "ติดต่อ",
                "images/Contacts.png"
            ]
        ],
        [
            [
                TEXT_ICO,
                "การศึกษา",
                "images/Education.png"
            ],
            [
                TEXT_ICO,
                "วิชาที่ชอบ",
                "images/Subject I like.png"
            ],
            [
                PIC_ICO,
                "ม.ต้น",
                "images/glasses.jpg"
            ],
            [
                PIC_ICO,
                "กีฬาสี 2023",
                "images/Color Sports.jpg"
            ]
        ],
        [
            [
                TEXT_ICO,
                "งานอดิเรก",
                "images/Hobby.png"
            ],
            [
                TEXT_ICO,
                "สิ่งที่ชอบ",
                "images/Like to do.png"
            ]
        ],
        [
            [
                TEXT_ICO,
                "อาชีพ",
                "images/dream job.png"
            ]
        ],
        [
            [
                "images/vid-icon.webp",
                "Showcase",
                "v",
            ]
        ]
    ]

    const folderWindow = document.getElementById("folder-open");
    const folderTitle = document.getElementById("folder-title");
    const fileList = document.getElementById("folder-files");
    const closeBtn = document.getElementById("folder-close");
    const allFolders = document.getElementById("desktop").children;
    const contentImg = document.getElementById("content");
    const exclusiveVid = document.getElementById("vid");

    let viewing = 0;
    let currentView;
    let btns;
    let btnListeners

    for (let i = 0; i < allFolders.length; i++) {
        const folderOrder = i;
        const folder = allFolders[i];
        
        folder.addEventListener("mousedown", () => {
            if (viewing == 0) {
                viewing = 1;
                folderWindow.style.display = "grid";
                folderTitle.textContent = folder.children[1].textContent;

                function closeFolder() {
                    if (viewing == 1) {
                        closeBtn.removeEventListener("mousedown", closeFolder);
                        folderWindow.style.display = "none";
                        viewing = 0;

                        let currentBtn;

                        for (let j = 0; j < btns.length; j++) {
                            currentBtn = btns[j];
                            currentBtn.removeEventListener("mousedown", btnListeners[j]);
                            currentBtn.remove();
                        }
                    }
                }

                btns = [];
                btnListeners = [];
                currentView = FOLDERS_DATA[folderOrder];

                for (let j = 0; j < currentView.length; j++) {
                    const currentFileData = currentView[j];

                    const fileBtn = document.createElement("div");
                    const fileIco = document.createElement("img");
                    const fileName = document.createElement("div");

                    fileIco.src = currentFileData[0];
                    fileName.textContent = currentFileData[1];

                    fileBtn.appendChild(fileIco);
                    fileBtn.appendChild(fileName);
                    fileList.appendChild(fileBtn);

                    function openContents() {
                        if (viewing == 1) {
                            viewing = 2;

                            let himCook;

                            if (currentFileData[2] != "v") {
                                contentImg.style.display = "block";
                                contentImg.src = currentFileData[2];

                                himCook = function() {
                                    contentImg.style.display = "none";
                                }

                                contentImg
                            } else {
                                exclusiveVid.style.display = "block";

                                himCook = function() {
                                    exclusiveVid.pause();
                                    exclusiveVid.currentTime = 0;
                                    exclusiveVid.style.display = "none";
                                }
                            }

                            function huh(e) {
                                outsideThing.removeEventListener("mousedown", huh);
                                viewing = 1;
                                himCook();
                            }
                            
                            outsideThing.addEventListener("mousedown", huh);
                        }
                    }

                    btns[btns.length] = fileBtn;
                    btnListeners[btnListeners.length] = openContents;
                    fileBtn.addEventListener("mousedown", openContents);
                }

                closeBtn.addEventListener("mousedown", closeFolder);
            }
        });
    }
}