document.addEventListener('DOMContentLoaded', function () {
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
        uploadInput.addEventListener('change', () => {
            if (uploadInput.files.length > 0) {
                const fileName = uploadInput.files[0].name;
                uploadLabel.textContent = `📄 ${fileName}`;
            }
        });
    

    let careerData = {};
    let selectedCourses = {};
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    fetch('data/Fisi.json')
        .then(response => response.json())
        .then(horariosData => {

            async function mergePdfData() {
                        const file = uploadInput.files[0];
                        if (!file) {
                            alert("¡Por favor, sube un PDF primero!");
                            return;
                        }
            
                        const formData = new FormData();
                        formData.append("pdf", file);
            
                        try {
                            const respuesta = await fetch("https://Cicilis.pythonanywhere.com/upload", {
                                method: "POST",
                                body: formData
                            });
            
                            if (!respuesta.ok) {
                                console.error("Error en la respuesta:", respuesta.status, respuesta.statusText);
                                alert("Hubo un error al enviar el PDF. Código: " + respuesta.status);
                                return;
                            }
            
                            const data = await respuesta.json();
            
                            if (data) {
                                alert("¡PDF subido y procesado con éxito!");
            
                                horariosData = mergeData(horariosData, data); 
            
                                console.log("Datos combinados:", horariosData);
                                 careerData = {};
                                 selectedCourses = {};   
                                initializeSchedulePage(horariosData);  
                            } else {
                                console.error("Error en el procesamiento del PDF:", data.error || "Error desconocido");
                                alert("Hubo un error al procesar el PDF: " + (data.error || "Error desconocido"));
                            }
                        } catch (error) {
                            console.error("Error al enviar el PDF:", error);
                            alert("Error de conexión con el servidor. Revisa la consola para más detalles.");
                        }
                    }

        function mergeData(horariosData, data) {
            const mergedData = {};
        
            for (let year in data) {
                if (!mergedData[year]) {
                    mergedData[year] = {};  
                }
        
                for (let career in data[year]) {
                    if (!mergedData[year][career]) {
                        mergedData[year][career] = {};  
                    }
        
                    for (let cycle in data[year][career]) {
                        if (!mergedData[year][career][cycle]) {
                            mergedData[year][career][cycle] = []; 
                        }
        
                        data[year][career][cycle].forEach(assignature => {
                            const existingAssignatureIndex = mergedData[year][career][cycle].findIndex(
                                existingAssignature => existingAssignature["Asignatura"] === assignature["Asignatura"]
                            );
        
                            if (existingAssignatureIndex === -1) {
                                mergedData[year][career][cycle].push(assignature);
                            } else {
                                mergedData[year][career][cycle][existingAssignatureIndex].Horarios = [
                                    ...mergedData[year][career][cycle][existingAssignatureIndex].Horarios,
                                    ...assignature.Horarios
                                ];
                            }
                        });
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
        
                        horariosData[year][career][cycle].forEach(assignature => {
                            const existingAssignatureIndex = mergedData[year][career][cycle].findIndex(
                                existingAssignature => existingAssignature["Asignatura"] === assignature["Asignatura"]
                            );
        
                            if (existingAssignatureIndex === -1) {
                                mergedData[year][career][cycle].push(assignature);
                            } else {
                                mergedData[year][career][cycle][existingAssignatureIndex].Horarios = [
                                    ...mergedData[year][career][cycle][existingAssignatureIndex].Horarios,
                                    ...assignature.Horarios
                                ];
                            }
                        });
                    }
                }
            }
        
            return mergedData;
        }
        

        sendButton.addEventListener("click", mergePdfData);

        // Inicializar la página con los datos de horarios
        function clearScheduleData() {
            careerSelect.innerHTML = '';
            yearSelect.innerHTML = '';
            cycleSelect.innerHTML = '';
            subjectSelect.innerHTML = '';
            sectionSelect.innerHTML = '';
            totalCredits = 0;
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
            });

            colorPicker.addEventListener('input', () => {
                const selectedColor = colorPicker.value;
            });

            addScheduleBtn.addEventListener('click', addSchedule);

            exportImageBtn.addEventListener('click', exportToImage);
            exportExcelBtn.addEventListener('click', exportToExcel);
            createScheduleTable();
            totalCredits = 0;
        }
        let totalCredits = 0;
        initializeSchedulePage(horariosData);

        function updateYears() {
            const selectedCareer = careerSelect.value;
        
            yearSelect.innerHTML = '';  
        
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
                }
            }
        
            addScheduleBtn.disabled = !(selectedYear && selectedCycle && selectedSubject && sectionSelect.value);
        }
            

    
            function addSchedule() {
                const selectedCareer = careerSelect.value;
                const selectedYear = yearSelect.value; 
                const selectedCycle = cycleSelect.value;
                const selectedSubject = subjectSelect.value;
                const selectedSection = sectionSelect.value;
                const selectedColor = colorPicker.value;
  
                let conflictoEncontrado = false;
                const auxiliarvar=true;
                const coursesInCycle = careerData[selectedCareer][selectedYear][selectedCycle];
                if (coursesInCycle) {
                    coursesInCycle.forEach(courseInfo => {
                        if (courseInfo['Asignatura'].match(/-(.+)/)[1].trim() === selectedSubject && courseInfo['Sec.'] === selectedSection && courseInfo.Horarios) {
                            let storedCourse;

                            for (const courseKey in selectedCourses) {
                                storedCourse = selectedCourses[courseKey];

                                if (storedCourse.asig === courseInfo['Asignatura'].match(/-(.+)/)[1].trim()) {
                                    console.error('Este curso ya ha sido agregado', storedCourse.asig);
                                    alert(`Este curso ya ha sido agregado`);
                                    conflictoEncontrado = true;
                                    
                                    break;
                                }
                            }
                            if(!conflictoEncontrado){
                                const courseKey = `${selectedSubject}-${selectedSection}X`;
                                selectedCourses[courseKey] = {
                                asig: `${selectedSubject}`,
                                credits: parseInt(courseInfo['Créd.'], 10)
                                };
                                const SelectedCourse=parseInt(courseInfo['Créd.'], 10)
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
                                                console.error(`Conflicto de horarios. No se pudo agregar el horario para ${selectedSubject} - ${selectedSection} el ${days[dayIndex]} a las ${hour}:00.`);
                                                alert(`Conflicto de horarios. No se pudo agregar el horario para ${selectedSubject} - ${selectedSection} el ${days[dayIndex]} a las ${hour}:00.`);
                                                conflictoEncontrado = true;
                                                if(auxiliarvar==true){
                                                    
                                                    console.log(SelectedCourse)
                                                    totalCredits -= SelectedCourse;
                                                    updateTotalCredits();
                                                    delete selectedCourses[courseKey];
                                                    auxiliarvar=false;
                                                }
                                                
                                                break;
                                            }
                                        }
                                        
                                    } else {
                                        console.error('Día no válido en el horario:', schedule.Día);
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
            function updateTotalCredits() {
                const totalCreditsElement = document.getElementById('total-credits');
                totalCreditsElement.textContent = `Total de Créditos: ${totalCredits}`;
            }
            
            


            function exportToExcel() {
                const wb = XLSX.utils.table_to_book(scheduleTable, { sheet: 'Horarios' });
                XLSX.writeFile(wb, 'horarios.xlsx');
            }

            function createScheduleTable() {
                const scheduleTable = document.getElementById('schedule-table');  // Suponiendo que esta es tu tabla
    
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
            

            function deleteSchedule(cell) {
                const courseInfo = cell.textContent.trim().split('-');
                const selectedSubject = courseInfo[0].trim();
                const selectedSection = courseInfo[1].trim();
                
                const courseKey = `${selectedSubject}-${selectedSection}`;

                const selectedCourse = selectedCourses[courseKey];
                const selectedCredits=selectedCourse.credits;
                            
                totalCredits -= selectedCredits;

                updateTotalCredits();
                delete selectedCourses[courseKey];
                for (let i = 1; i < scheduleTable.rows.length; i++) {
                    const currentRow = scheduleTable.rows[i];
            
                    for (let j = 1; j < currentRow.cells.length; j++) {
                        const currentCell = currentRow.cells[j];
            
                        if (currentCell.textContent.includes(selectedSubject) && currentCell.textContent.includes(selectedSection)) {
                            currentCell.textContent = '';
                            currentCell.style.backgroundColor = '#E6F7FF';
                            currentCell.dataset.color = '';
                            

                            const deleteBtn = currentCell.querySelector('.delete-button');
                            if (deleteBtn) {
                                currentCell.removeChild(deleteBtn);
                            }
                        }
                    }
                }
            }
            
            
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
});

