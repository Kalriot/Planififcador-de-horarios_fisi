document.addEventListener('DOMContentLoaded', function () {
    console.log(`
%%##%#%%##%##%%#%##%%#%%#%%#%%#%%#%%#%%##%##%#####%##%##%%#%%#%%#%%##%#%%#%%##%##%##%%#%%#%##%%#
####%##%#####%##%######%#%######%#%%#####%++++++*#%##%########%##%###%#%######%##%########%#####
##%#%##%#%###%##++++++*%#%######%#%##%#%#%*+++++##%##%######%#%######%#%##%#%#%##%#****###%#####
%#%#%##%#%#%#%%#++++++*%#%#%%#%#%#%%#%#%#%##*+*#%#%%#%#%####*+*+#%#%#%#%%#%#%#%##%##**#%%#%#%###
%#%#%#%%#%#%#%%#%*++*##%#%#%%#%#%#%%#%#%#%##%#%#%#%%#%#%#%###==*#%#%#%#%%#%#%#%##%#%###%%#%#%##%
##%#%##%#%#%#%##%#%####%#%####*#%#%##%#%#%##%#%#%#%##%#%####%#%####%#%#%##%#%#%##%#%#%##%#%#%###
##%#%##%#%#%#%##%#%####%#%#****#%#%##%#%#%##%#%#%#%##%#%####%#%####%#%#%##%#%#%##%#%####%#%#%###
%#%#%##%#%#%#%##%#%#%##%#%######%#%%#%#%%%@@@%@@@@@@@@%@%%##%#%##%###%#%%%@@@@%@@@@@#%#%%#%#%###
%#%#%**#*##%#%%#%#%#%#%%#%#%%%%#%%@@@%@=@++#=@=#*+@=%=+*#@@@@%%##%#%#%#%%@@@@@@@@@@@%%#%%#%#%%%#
####%#***####%##%########%##%%@@#++++*+#+**+#+*++*+#+*+=*+*++*@@@%%##%#%#%%%%%%%%%%%###%##%#####
######################%##%@@#+#=%=#+=%=%=#*=@=%++#=%=#+=#=%=#+=#=@%@@%######+++++*###########%##
#%#%#%#%%#%#%%#%#%#%#%@@@*++==++*=+=+*+*++++*+*++++*++==+=+++==++*+++@@%%%#%#*+*##%#%#%%#%#%#%%#
#%#%#%#%%#%#%%#%#%#%@@#=%=%=*#=%=%=**=%=%+*#=@+#*+%=%=**=%=%=**=%=%+*#+@@%#%#%%#%#%#%#%%#%######
#%#%####%#%#%####%@@***+#@@*+*+#+#=+*+#+#+*#+%+**+%+#++*=#+#++*+#+#+**+%+@@%#%####%#%##%#++++++*
#%#%####%#%#%####@@*%++@+%=#+=#=%=#++#=@=#*+%=%+*#=@=#++#=%=#=+#=%=#*+%=%+*@@%####%#%####*+++++#
#%#%#*++++++#%#%%@@=%**#=%+@+=#=%=#++@#@=#*+@=%+*#=@=#++#=%=#=+#=%=#*@%=@=*#%@%###%#%#%%#%#*+###
#%#%##+++++*%%%@##@%***+#*@++++*+*=+*@#**++**#***+#+*++++#+*++++*+*++#@#***+#@@%%#%#%#%%#%#%#%%#
#%#%####++##%@@**@=@+##+@@@+#%=@=@=#@#@=@+#%=@=##+@=@=#%=@=@=%#+@=@+###@=%*+@=@@@#%#%####%#%#%##
#%########%#@@##@*#*****#%******#**@@**#****#******#***+**#***+**#****#@#****#%@@###%########%##
%%#%%##%##%%@@+#%+@=%*%@@@=%*+@=@=#%@%=@*@#+@=%**%=@=%*+@=@=%+*%=@=%*+@@@+#%=@=@@%##%#%%##%%#%%#
%%%%%%%%%%%%@@+%@+@=@+*@+%=#++#=@=@@#@+@+#*+%=%+*%=@=#++#=@=%++#=@*@*+%%@+*#+@=%@@%%%%%%%%%%%%%%
*===###%##%@%*%*#%+%+#%@%+%+##+%+%@@#+%+%*##+%+##+%+%+##+%+%+%*+%+%**#+@@@**%+%+%%@%######%#####
##+####%##@%%+%@#%+%*#@@%+%+##+%+@=@#+%+%*##+%+##+%+%+##+%+%+##*%+%*##+%@@#*%+%+%@@%######%#####
%#%#%##%#%@@+%%@#+@+%#@%+@+%**%+@@=@#%+@+##*%+%**%=@+%**%+@+%**%+@+%**%+@%@#+@+%*@@%#%#%%#%#%###
%#%#%#%%#%@@+@@%#+@#@@@@=@=@*+@=@#=@#@=@=%#+@=@**%=@=@**@=@=@+*%=@=%**@+@%@%=@=@*@@%#%#%%#%#%##%
##%#%##%@@@@@@@@@@@*%@@%*%*%%%%*@==@%%*%*##*%*%###*%*%#%%*%*%##%*%*###%*@+@#*%*%#%@@@%##%#%#%###
##%#%#%@+#%+@=%@@==%@@#+@=@+#%+@@+=%@%@@@@@@@@%%#*%*##%%%%%%@@@@@@@@@%+@@+@*@=@+%@%@%@##%#%#%###
%#%#%@@@#####*##*@*===#@@@###%@*+*%=#@@%++=+*%#+===========++@@#*+==*@@%=%%##*###@@@@@@#####%###
%%@@*=%%@#*@=@+#%=@@=====%@@+==+%=@@@#=@@==+@%==============++%===%@*=#@@+%@%@=@#@+=@@@#**##%%%%
%@====@%@%#@=@*%@+*@@#====+@@=#+#@@+==@@@*=@+*#==============@@#=#*@%*=+@@=#@@@@@@===+@@##%#####
#%@@*=@@#%%*%*%#@#=@@@@%=#@+=%+@@@===*@*#%@%*%@==============@##@@#**@==#@@%@@@@@@#====+@@%#####
#%#%@@@@+#%+@=%*@%=*@@@@@@+==+*@@====#@*%%@%*@@==============@#*@@%*#@===@@@@@@@*@%@+=====@@@%##
#*+++%@#%%#%*%#%@@==@%===#==++#@#====*%#****##*==============@#*##***@===#@@@%*@#@@#@%====+@@%%#
#%*+#@@+@%*@=@*%@@==@@**+======++#====%@****@#================@%***#%%====#@#@*@#+@+@%@##@@%#%##
#%#%@%@#@%%%#%#%@@==#@+==%============================================+++=#@#%#@%=@%@#@@@%##===+
#%#%#@%@*#%+@+@##@+==@#=+*================================================#@@+@#%=@@+@*%@@#%#+##
#%#@#@#@%@%#%*%#%@#==@@===***=============================================*@@*%#%=%@#@#@@@#%#%%#
#%#%#@@%@%#@+@*%@@%==#@=====@=============================================*@%@+@%=+@@*@%%@#%#%##
#%@#%@@@@%#@+@*%%@@==*@*===========================@=#+%==================#@*@*@@==@@*@%%@%##%##
#%@=@@@@%%@#@#%%%@@==+@@===========================*%##*=================%@@%#@%@==@%@%@@@@*#%##
%%@+@@+@##@+@=@#*@@+==%@@@@@@@@@@@@====================================*@@@#@=@*@==%#@*%@@@##%%%
%@%@@%%%@%%%%%%%%%@#==#@@@@@@@@@@@@@@@@#+===========================*@@@@@@@%%%@@+=*@%@@@@@@#%%#
%@@%@*@#@%#@+@#%@*@%==+@@@@@@@@@@@@@@@@@@*==*=*================+#@@@@@@@@@@@*@*@@+==@*@%%@*@%###
@@@%@%@%@@%@#@%@@#@@===@@@@@@@@@@@@@@@@@@*===========###%@@@@@@@@@@@@@@@@@@@@@#@@===@%@@@@%@@@@%
@%@@#@*@%%@*@*@%%@@@===#@@@@@@@@@@@%@#@@*@@%=#=+==*+@%@@@@@@@@@@@@@@@@@@@@@@@*@#@*==%@#@@#@*@#@@
@%@@#@*@%%@*@*@%%@*@+==+@@@@@@@@%#%@*=@@===+@@@##%@@@=+@@@@@@@@@@@@@@@@@@@@@@#@#@%==#@#@@#@*@%@@
%@@@@#@%@@%@#@%@@%@@#===@@@@@@#=#@%==+*@*=======+@#====#@%%@@@@@@@@@@@@@@@@@@@#@@%==+@@@@@%@%@@%
@@@%@#@%@@%@*@#@@#@@#===#@@@%=+%@*+==*=@@+======%@@@*==+@@#+@@+@@@@@@@@@@@@@@@*@@@===@@@@@#@#@@%
=#@@@@%@@@@%@%@@@@%@%====@@#==#@*+===+++@@+===#@@@@@@@@@@%=+#@*+@@@@@@@@@@@@@%@@@@===@@@@@@%@@@@
====+@@@%%@*@*@%#@+@@====%@=++@@+%=+*=%=%@@@@@+%@@@@@+==@%=%=@@=@@@@@@@@@@%#@+@#@@===@@@@#@*@%@@
=====*@@@@@%@%@@@@%@@+++=%#===#@@#==+=*+*%@#====@@@@@@+%@*=++@@++*@@@@%%@%%%%%@%%%===*%%@%#%%%%@
=====*@@@@%@#@%@@#@#@@*%##=+==+=*=+==*=#=*%@%=+@@@@@@@@@@=*=+%%*=##@%==+=+++*+**+******#*#*+*=*%
    `);
    
    const cycleSelect = document.getElementById('cycle-select');
    const subjectSelect = document.getElementById('subject-select');
    const sectionSelect = document.getElementById('section-select');
    const addScheduleBtn = document.getElementById('add-schedule-btn');
    const scheduleTable = document.getElementById('schedule-table');
    const colorPickerBtn = document.getElementById('color-picker-btn');
    const colorPicker = document.getElementById('color-picker');
    const exportImageBtn = document.getElementById('export-image-btn');
    const exportExcelBtn = document.getElementById('export-excel-btn');
    const careerSelect = document.getElementById('career-select');
    const yearSelect = document.getElementById('year-select');
    const uploadInput = document.getElementById('upload-pdf');
    const uploadLabel = document.querySelector('.upload-label');
    const sendButton = document.getElementById("send-button");
    const contenedor = document.getElementById("contenedorDatos");
    const clearScheduleBtn = document.getElementById('clear-schedule-btn');
    
    uploadInput.addEventListener('change', () => {
            if (uploadInput.files.length > 0) {
                const fileName = uploadInput.files[0].name;
                uploadLabel.textContent = `📄 ${fileName}`;
            }
    });

    let careerData = {};
    let selectedCourses = {};
    let cellColors = {};
    let excelCellColors = {};  
    let excelCellTexts = {};  
    let totalCredits = 0;
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    const savedColor = localStorage.getItem('selectedColor') || '#90EE90';
    colorPicker.value = savedColor;

    colorPicker.addEventListener('input', function() {
        const selectedColor = colorPicker.value;
        localStorage.setItem('selectedColor', selectedColor);
    });

    function updateTotalCredits() {
        const totalCreditsElement = document.getElementById('total-credits');
        if (totalCreditsElement) {
            totalCreditsElement.textContent = `Total de Créditos: ${totalCredits}`;
        }
    }

    function colNumToLetter(colNum) {
        let letter = '';
        while (colNum > 0) {
            colNum--;
            letter = String.fromCharCode((colNum % 26) + 65) + letter;
            colNum = Math.floor(colNum / 26);
        }
        return letter;
    }

    function deleteSchedule(cell) {
        const courseInfo = cell.textContent.trim().split('-');
        const selectedSubject = courseInfo[0].trim();
        const selectedSection = courseInfo[1].trim();
        
        const courseKey = `${selectedSubject}-${selectedSection}`;

        if (selectedCourses[courseKey]) {
            const selectedCourse = selectedCourses[courseKey];
            const selectedCredits = selectedCourse.credits;
                                    
            totalCredits -= selectedCredits;
            updateTotalCredits(); 

            delete selectedCourses[courseKey];

            const scheduleTable = document.getElementById('schedule-table');
            for (let i = 1; i < scheduleTable.rows.length; i++) { 
                const currentRow = scheduleTable.rows[i];
            
                for (let j = 1; j < currentRow.cells.length; j++) { 
                    const currentCell = currentRow.cells[j];
            
                    if (currentCell.textContent.includes(selectedSubject) && currentCell.textContent.includes(selectedSection)) {
                        currentCell.textContent = '';
                        currentCell.style.backgroundColor = '';
                        currentCell.removeAttribute('style');
                        currentCell.removeAttribute('data-color');

                        const hour = i + 8; 
                        const dayIndex = j - 1;
                        
                        const cellId = `${dayIndex}-${hour}`;
                        if (cellColors[cellId]) {
                            delete cellColors[cellId];
                        }
                        
                        const excelId = `${colNumToLetter(dayIndex + 2)}${hour - 7}`;
                        if (excelCellColors[excelId]) {
                            delete excelCellColors[excelId];
                        }
                        if (excelCellTexts[excelId]) {
                            delete excelCellTexts[excelId];
                        }

                        const deleteBtn = currentCell.querySelector('.delete-button');
                        if (deleteBtn) {
                            currentCell.removeChild(deleteBtn);
                        }
                    }
                }
            }
            
            // Guardar cambios en localStorage
            saveCoursesToLocalStorage();
        }
    }

    // Función para guardar cursos en localStorage
    function saveCoursesToLocalStorage() {
        localStorage.setItem('savedCourses', JSON.stringify(selectedCourses));
        localStorage.setItem('savedCellColors', JSON.stringify(cellColors));
        localStorage.setItem('savedExcelColors', JSON.stringify(excelCellColors));
        localStorage.setItem('savedExcelTexts', JSON.stringify(excelCellTexts));
        localStorage.setItem('savedTotalCredits', totalCredits.toString());
    }

    // Función para cargar cursos desde localStorage
    function loadCoursesFromLocalStorage() {
        const savedCourses = localStorage.getItem('savedCourses');
        const savedCellColors = localStorage.getItem('savedCellColors');
        const savedExcelColors = localStorage.getItem('savedExcelColors');
        const savedExcelTexts = localStorage.getItem('savedExcelTexts');
        const savedCredits = localStorage.getItem('savedTotalCredits');
        
        if (savedCourses) {
            selectedCourses = JSON.parse(savedCourses);
        }
        if (savedCellColors) {
            cellColors = JSON.parse(savedCellColors);
        }
        if (savedExcelColors) {
            excelCellColors = JSON.parse(savedExcelColors);
        }
        if (savedExcelTexts) {
            excelCellTexts = JSON.parse(savedExcelTexts);
        }
        if (savedCredits) {
            totalCredits = parseInt(savedCredits) || 0;
        } else {
            totalCredits = 0;
        }
        
        updateTotalCredits();
        
        setTimeout(() => {
            restoreVisualSchedule();
        }, 100);
    }

    // Función para restaurar la visualización del horario
    function restoreVisualSchedule() {
        for (const excelPosition in excelCellTexts) {
            const courseText = excelCellTexts[excelPosition];
            const color = excelCellColors[excelPosition];
            
            if (courseText && color) {
                // Convertir posición Excel (ej: "B2") a índices de tabla
                const colLetter = excelPosition.match(/[A-Z]+/)[0];
                const rowNumber = parseInt(excelPosition.match(/\d+/)[0]);
                
                // Convertir letra de columna a número
                let colNum = 0;
                for (let i = 0; i < colLetter.length; i++) {
                    colNum = colNum * 26 + (colLetter.charCodeAt(i) - 65 + 1);
                }
                
                const dayIndex = colNum - 2; 
                const hour = rowNumber + 7; 
                
                if (dayIndex >= 0 && dayIndex < days.length && hour >= 8 && hour <= 21) {
                    const rowIndex = hour - 8;
                    const colIndex = dayIndex + 1;
                    
                    if (scheduleTable && scheduleTable.rows[rowIndex] && scheduleTable.rows[rowIndex].cells[colIndex]) {
                        const cell = scheduleTable.rows[rowIndex].cells[colIndex];
                        
                        if (!cell.textContent.trim()) {
                            cell.textContent = courseText;
                            cell.classList.add('schedule-cell');
                            cell.style.backgroundColor = color;
                            cell.dataset.color = color;
                            
                            const deleteBtn = document.createElement('button');
                            deleteBtn.classList.add('delete-button');
                            deleteBtn.innerHTML = 'X';
                            deleteBtn.addEventListener('click', () => deleteSchedule(cell));
                            cell.appendChild(deleteBtn);
                        }
                    }
                }
            }
        }
    }

    fetch('data/Fisi.json')
        .then(response => response.json())
        .then(horariosData => {

            async function mergePdfData() {
                        const file = uploadInput.files[0];
                        if (!file) {
                            alert("¡Por favor, sube un PDF primero!");
                            return;
                        }
            
                        // Desactivar el botón de enviar
                        sendButton.disabled = true;
                        sendButton.textContent = "Enviando...";
            
                        const formData = new FormData();
                        formData.append("pdf", file);
            
                        try {
                            const respuesta = await fetch("https://Cicilis.pythonanywhere.com/upload", {
                                method: "POST",
                                body: formData
                            });
            
                            if (!respuesta.ok) {
                                alert("Hubo un error al enviar el PDF. Código: " + respuesta.status);
                                return;
                            }
            
                            const data = await respuesta.json();
            
                            if (data) {
                                alert("¡PDF subido y procesado con éxito!");
            
                                horariosData = mergeData(horariosData, data); 
            
                                 careerData = {};
                                 selectedCourses = {};   
                                initializeSchedulePage(horariosData);  
                            } else {
                                alert("Hubo un error al procesar el PDF: " + (data.error || "Error desconocido"));
                            }
                        } catch (error) {
                            alert("Error de conexión con el servidor. Revisa la consola para más detalles.");
                        } finally {
                            // Reactivar el botón de enviar al finalizar (éxito o error)
                            sendButton.disabled = false;
                            sendButton.textContent = "Enviar";
                        }
                    }

                    function mergeData(horariosData, data) {
                        const mergedData = {};
                    
                        const addAssignments = (targetCycle, sourceAssignments) => {
                            sourceAssignments.forEach(assignature => {
                                targetCycle.push(assignature);
                            });
                        };
                    
                        for (let year in data) {
                            if (!mergedData[year]) {
                                mergedData[year] = {};
                            }
                    
                            for (let career in data[year]) {
                                if (horariosData[year] && horariosData[year][career]) {
                                    delete horariosData[year][career]; 
                                }
                    
                                if (!mergedData[year][career]) {
                                    mergedData[year][career] = {};
                                }
                    
                                for (let cycle in data[year][career]) {
                                    if (!mergedData[year][career][cycle]) {
                                        mergedData[year][career][cycle] = [];
                                    }
                    
                                    addAssignments(mergedData[year][career][cycle], data[year][career][cycle]);
                                }
                            }
                        }
                    
                        for (let year in horariosData) {
                            if (!mergedData[year]) {
                                mergedData[year] = {};
                            }
                    
                            for (let career in horariosData[year]) {
                                if (!mergedData[year][career]) {
                                    mergedData[year][career] = {};
                                }
                    
                                for (let cycle in horariosData[year][career]) {
                                    if (!mergedData[year][career][cycle]) {
                                        mergedData[year][career][cycle] = [];
                                    }
                    
                                    addAssignments(mergedData[year][career][cycle], horariosData[year][career][cycle]);
                                }
                            }
                        }
                    
                        return mergedData;
                    }
                    
                    
        

        sendButton.addEventListener("click", mergePdfData);

        function clearScheduleData() {
            careerSelect.innerHTML = '';
            yearSelect.innerHTML = '';
            cycleSelect.innerHTML = '';
            subjectSelect.innerHTML = '';
            sectionSelect.innerHTML = '';
            totalCredits = 0;
            updateTotalCredits();
            updateTeacher(); // Limpiar el docente al limpiar datos
            careerData = {};  
        }
        function initializeSchedulePage(horariosData) {
            clearScheduleData(); 

            careerSelect.innerHTML = '';  
            careerSelect.insertAdjacentHTML('afterbegin', '<option value="">---</option>');
            for (const career in horariosData) {
                const option = document.createElement('option');
                option.value = career;
                option.textContent = career;
                careerSelect.appendChild(option);

                careerData[career] = horariosData[career];
            }

            careerSelect.addEventListener('change', updateYears);
            yearSelect.addEventListener('change', updateCycles);
            cycleSelect.addEventListener('change', updateSubjects);
            subjectSelect.addEventListener('change', updateSections);

            sectionSelect.addEventListener('change', () => {
                addScheduleBtn.disabled = !(cycleSelect.value && subjectSelect.value && sectionSelect.value);
                updateTeacher(); // Actualizar el docente cuando se cambie la sección
            });

            colorPicker.addEventListener('input', () => {
                const selectedColor = colorPicker.value;
            });

            addScheduleBtn.addEventListener('click', addSchedule);

            exportImageBtn.addEventListener('click', exportToImage);
            exportExcelBtn.addEventListener('click', exportToExcel);
            clearScheduleBtn.addEventListener('click', clearAllSchedule);
            createScheduleTable();
            totalCredits = 0;
        }
        initializeSchedulePage(horariosData);
        
        // Cargar datos guardados después de inicializar la página
        setTimeout(() => {
            loadCoursesFromLocalStorage();
        }, 500);

        function updateYears() {
            const selectedCareer = careerSelect.value;
        
            yearSelect.innerHTML = '';  
            updateTeacher(); // Limpiar el docente al cambiar años
        
            if (selectedCareer) {
                const uniqueYears = [...new Set(Object.keys(horariosData[selectedCareer]).filter(year => year !== 'Año'))];
        
                uniqueYears.forEach(year => {
                    const option = document.createElement('option');
                    option.value = year;
                    option.textContent = year;
                    yearSelect.appendChild(option);
                });
            }
        
            updateCycles();
        }
        

        function updateCycles() {
            const selectedCareer = careerSelect.value;
            const selectedYear = yearSelect.value;
            const selectedCareerData = careerData[selectedCareer];
            
            cycleSelect.innerHTML = '';  
            const defaultCycleOption = document.createElement('option');
            defaultCycleOption.value = '';
            defaultCycleOption.textContent = '---';
            cycleSelect.appendChild(defaultCycleOption);
            
            subjectSelect.innerHTML = ''; 
            sectionSelect.innerHTML = '';  
            updateTeacher(); // Limpiar el docente al cambiar ciclos
        
            if (selectedCareerData && selectedYear && selectedCareerData[selectedYear]) {
                const uniqueCycles = new Set();  
        
                for (const cycle in selectedCareerData[selectedYear]) {
                    if (!uniqueCycles.has(cycle)) {
                        uniqueCycles.add(cycle);
                        const option = document.createElement('option');
                        option.value = cycle;
                        option.textContent = cycle;
                        cycleSelect.appendChild(option);
                    }
                }
            }
        
            updateSubjects();
        }
        function updateSubjects() {
            const selectedCareer = careerSelect.value;
            const selectedYear = yearSelect.value;
            const selectedCycle = cycleSelect.value;
        
            subjectSelect.innerHTML = '';
            sectionSelect.innerHTML = '';
            updateTeacher(); // Limpiar el docente al cambiar materias
        
            const subjectsSet = new Set();
        
            if (selectedCareer && selectedYear && selectedCycle) {
                const coursesInCycle = careerData[selectedCareer][selectedYear][selectedCycle];
        
                if (coursesInCycle) {
                    coursesInCycle.forEach(courseSection => {
                        const subjectName = courseSection['Asignatura'].match(/-(.+)/)[1].trim();
                        subjectsSet.add(subjectName); 
                    });
        
                    const defaultOption = document.createElement('option');
                    defaultOption.value = '';
                    defaultOption.textContent = '---';
                    subjectSelect.appendChild(defaultOption);
        
                    subjectsSet.forEach(subject => {
                        const subjectOption = document.createElement('option');
                        subjectOption.value = subject;
                        subjectOption.textContent = subject;
                        subjectSelect.appendChild(subjectOption);
                    });
                }
            }
        
            updateSections();
        }
        function updateSections() {
            const selectedCareer = careerSelect.value;
            const selectedYear = yearSelect.value;
            const selectedCycle = cycleSelect.value;
            const selectedSubject = subjectSelect.value;
            
            sectionSelect.innerHTML = '';  
            updateTeacher(); // Limpiar el docente al cambiar secciones
        
            const sectionsSet = new Set();
        
            if (selectedCareer && selectedYear && selectedCycle && selectedSubject) {
                const coursesInCycle = careerData[selectedCareer][selectedYear][selectedCycle];
        
                if (coursesInCycle) {
                    coursesInCycle.forEach(courseSection => {
                        const subjectName = courseSection['Asignatura'].match(/-(.+)/)[1].trim();
                        if (subjectName === selectedSubject) {
                            sectionsSet.add(courseSection['Sec.']);
                        }
                    });
        
                    sectionsSet.forEach(section => {
                        const sectionOption = document.createElement('option');
                        sectionOption.value = section;
                        sectionOption.textContent = section;
                        sectionSelect.appendChild(sectionOption);
                    });
                    
                    // Si hay secciones disponibles, actualizar el docente para la primera sección
                    if (sectionsSet.size > 0) {
                        updateTeacher();
                    }
                }
            }
        
            addScheduleBtn.disabled = !(selectedYear && selectedCycle && selectedSubject && sectionSelect.value);
        }
        
        function updateTeacher() {
            const selectedCareer = careerSelect.value;
            const selectedYear = yearSelect.value;
            const selectedCycle = cycleSelect.value;
            const selectedSubject = subjectSelect.value;
            const selectedSection = sectionSelect.value;
            const teacherDisplay = document.getElementById('teacher-display');
            
            if (!teacherDisplay) return;
            
            if (selectedCareer && selectedYear && selectedCycle && selectedSubject && selectedSection) {
                const coursesInCycle = careerData[selectedCareer][selectedYear][selectedCycle];
                
                if (coursesInCycle) {
                    let teacherName = 'Sin docente';
                    
                    coursesInCycle.forEach(courseSection => {
                        const subjectName = courseSection['Asignatura'].match(/-(.+)/)[1].trim();
                        if (subjectName === selectedSubject && courseSection['Sec.'] === selectedSection) {
                            // Buscar el nombre del docente en los datos del curso
                            const docenteField = courseSection['Docente'] || courseSection['DOCENTE'] || courseSection['docente'] || courseSection['Profesor'] || courseSection['PROFESOR'] || courseSection['profesor'];
                            
                            if (docenteField && docenteField !== '--') {
                                // Extraer solo el nombre después del " - "
                                const dashIndex = docenteField.indexOf(' - ');
                                if (dashIndex !== -1) {
                                    teacherName = docenteField.substring(dashIndex + 3).trim();
                                } else {
                                    teacherName = docenteField;
                                }
                            } else {
                                teacherName = 'Sin docente';
                            }
                        }
                    });
                    
                    teacherDisplay.textContent = teacherName;
                } else {
                    teacherDisplay.textContent = 'Sin docente';
                }
            } else {
                teacherDisplay.textContent = '---';
            }
        }
            

    

        function addSchedule() {
            const selectedCareer = careerSelect.value;
            const selectedYear = yearSelect.value;
            const selectedCycle = cycleSelect.value;
            const selectedSubject = subjectSelect.value;
            const selectedSection = sectionSelect.value;
            const selectedColor = colorPicker.value;
        
            let conflictoEncontrado = false;
            const auxiliarvar = true;
            const coursesInCycle = careerData[selectedCareer][selectedYear][selectedCycle];
            if (coursesInCycle) {
                coursesInCycle.forEach(courseInfo => {
                    if (courseInfo['Asignatura'].match(/-(.+)/)[1].trim() === selectedSubject && courseInfo['Sec.'] === selectedSection && courseInfo.Horarios) {
                        let storedCourse;
        
                        for (const courseKey in selectedCourses) {
                            storedCourse = selectedCourses[courseKey];
        
                            if (storedCourse.asig === courseInfo['Asignatura'].match(/-(.+)/)[1].trim()) {
                                alert(`Este curso ya ha sido agregado`);
                                conflictoEncontrado = true;
        
                                break;
                            }
                        }
                        if (!conflictoEncontrado) {
                            const courseKey = `${selectedSubject}-${selectedSection}X`;
                            selectedCourses[courseKey] = {
                                asig: `${selectedSubject}`,
                                credits: parseInt(courseInfo['Créd.'], 10)
                            };
                            const SelectedCourse = parseInt(courseInfo['Créd.'], 10);
                            totalCredits += SelectedCourse;
                            updateTotalCredits();
        
                            courseInfo.Horarios.forEach(schedule => {
                                const dayName = schedule.Día.trim().toUpperCase();
                                const dayIndex = days.findIndex(day => day.toUpperCase() === dayName || day.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase() === dayName);
        
                                if (dayIndex !== -1) {
                                    const startTime = parseInt(schedule.Inicio.split(':')[0], 10) + 1;
                                    const endTime = parseInt(schedule.Fin.split(':')[0], 10) + 1;
        
                                    for (let hour = startTime; hour < endTime; hour++) {
                                        const cell = scheduleTable.rows[hour - 8].cells[dayIndex + 1];
        
                                        if (cell.textContent.trim().length > 0) {
                                            alert(`Conflicto de horarios. No se pudo agregar el horario para ${selectedSubject} - ${selectedSection} el ${days[dayIndex]} a las ${hour}:00.`);
                                            conflictoEncontrado = true;
                                            if (auxiliarvar == true) {
                                                totalCredits -= SelectedCourse;
                                                updateTotalCredits();
                                                delete selectedCourses[courseKey];
                                                auxiliarvar = false;
                                            }
        
                                            break;
                                        }
                                    }
        
                                } else {
                                    alert(`Error al agregar el horario. Día no válido: ${schedule.Día}`);
                                    return;
                                }
                            });
        
                        }
                    }
        
                });
            }
        
            if (!conflictoEncontrado) {
                coursesInCycle.forEach(courseInfo => {
                    if (courseInfo['Asignatura'].match(/-(.+)/)[1].trim() === selectedSubject && courseInfo['Sec.'] === selectedSection && courseInfo.Horarios) {
                        courseInfo.Horarios.forEach(schedule => {
                            const dayName = schedule.Día.trim().toUpperCase();
                            const dayIndex = days.findIndex(day => day.toUpperCase() === dayName || day.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase() === dayName);
        
                            if (dayIndex !== -1) {
                                const startTime = parseInt(schedule.Inicio.split(':')[0], 10) + 1;
                                const endTime = parseInt(schedule.Fin.split(':')[0], 10) + 1;
        
                                for (let hour = startTime; hour < endTime; hour++) {
                                    const cell = scheduleTable.rows[hour - 8].cells[dayIndex + 1];

                                    const cellPosition = `${dayIndex}-${hour}`;
                                    cellColors[cellPosition] = selectedColor;
                                    
                                    const excelPosition = `${colNumToLetter(dayIndex + 2)}${hour - 7}`;
                                    excelCellColors[excelPosition] = selectedColor;
                                    excelCellTexts[excelPosition] = `${selectedSubject} - ${selectedSection}`;

                                    cell.textContent = `${selectedSubject} - ${selectedSection}`;
                                    cell.classList.add('schedule-cell');
                                    cell.style.backgroundColor = selectedColor;
                                    cell.dataset.color = selectedColor;
                                    if (cell.textContent.trim().length > 0) {
                                        const deleteBtn = document.createElement('button');
                                        deleteBtn.classList.add('delete-button');
                                        deleteBtn.innerHTML = 'X';
                                        deleteBtn.addEventListener('click', () => deleteSchedule(cell));

                                        cell.appendChild(deleteBtn);
                                    }
                                }
                            }
                        });
                    }
                });
            }
            
            // Guardar datos después de agregar el curso
            saveCoursesToLocalStorage();
        }
        
        
            

            function exportToImage() {
                const deleteButtons = document.querySelectorAll('.delete-button');
                deleteButtons.forEach(button => button.classList.add('hidden'));
            
                html2canvas(document.getElementById('schedule-table'), {
                    onclone: (documentClone) => {
                        const deleteButtonsClone = documentClone.querySelectorAll('.delete-button');
                        deleteButtonsClone.forEach(buttonClone => buttonClone.classList.remove('hidden'));
                    }
                }).then(function (canvas) {
                    deleteButtons.forEach(button => button.classList.remove('hidden'));
            
                    var link = document.createElement('a');
                    link.href = canvas.toDataURL();
                    link.download = 'horarios.png';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                });
            }
            


                        
            function exportToExcel() {
                if (Object.keys(excelCellColors).length === 0) {
                    alert('No hay cursos con colores para exportar');
                    return;
                }

                const wb = XLSX.utils.table_to_book(scheduleTable, { sheet: 'Horarios' });
                const excelFile = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
                const formData = new FormData();
                formData.append('file', new Blob([excelFile], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), 'horarios_sin_colores.xlsx');
                formData.append('cellColors', JSON.stringify(excelCellColors)); 
                formData.append('cellTexts', JSON.stringify(excelCellTexts));

                fetch('https://Cicilis.pythonanywhere.com/excel', {
                    method: 'POST',
                    body: formData
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.blob();
                })
                .then(blob => {
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = 'horarios_con_colores.xlsx';
                    link.click();
                })
                .catch(error => {
                    alert('Error al exportar a Excel. Intenta de nuevo.');
                });
            }            

            function createScheduleTable() {
                const scheduleTable = document.getElementById('schedule-table');
                scheduleTable.innerHTML = '';
                const intervals = Array.from({ length: 14 }, (_, i) => i + 8);
            
                const headerRow = scheduleTable.insertRow(0);
                headerRow.insertCell(0);
            
                days.forEach(day => {
                    const headerCell = headerRow.insertCell();
                    headerCell.textContent = day;
                });
            
                intervals.forEach(interval => {
                    const row = scheduleTable.insertRow();
                    const intervalCell = row.insertCell(0);
                    intervalCell.textContent = `${interval}:00 - ${interval + 1}:00`;
            
                    days.forEach(day => {
                        const cell = row.insertCell();
                        cell.classList.add('schedule-cell');
                        cell.textContent = '';
            
                        if (interval >= 8) {
                            const deleteBtnContainer = document.createElement('div');
            
                            const deleteBtn = document.createElement('button');
                            deleteBtn.textContent = 'Eliminar';
                            deleteBtn.addEventListener('click', () => deleteSchedule(cell));
            
                            if (cell.textContent.trim().length > 0) {
                                deleteBtnContainer.appendChild(deleteBtn);
                                cell.appendChild(deleteBtnContainer);
                            }
                        }
                    });
                });
            }
            

            function clearAllSchedule() {
                // Limpiar la tabla visual
                for (let i = 1; i < scheduleTable.rows.length; i++) {
                    const currentRow = scheduleTable.rows[i];
                    
                    for (let j = 1; j < currentRow.cells.length; j++) {
                        const currentCell = currentRow.cells[j];
                        
                        currentCell.textContent = '';
                        currentCell.style.backgroundColor = '';
                        currentCell.removeAttribute('style');
                        currentCell.removeAttribute('data-color');
                        
                        const deleteBtn = currentCell.querySelector('.delete-button');
                        if (deleteBtn) {
                            currentCell.removeChild(deleteBtn);
                        }
                    }
                }
                
                // Limpiar todas las variables
                selectedCourses = {};
                cellColors = {};
                excelCellColors = {};
                excelCellTexts = {};
                totalCredits = 0;
                updateTotalCredits();
                
                // Limpiar localStorage
                localStorage.removeItem('savedCourses');
                localStorage.removeItem('savedCellColors');
                localStorage.removeItem('savedExcelColors');
                localStorage.removeItem('savedExcelTexts');
                localStorage.removeItem('savedTotalCredits');
                
                alert('Horario limpiado exitosamente');
            }

            
            
            
            
        })
        .catch(error => alert('Error al cargar el archivo JSON'));
});

