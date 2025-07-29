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
    const clearScheduleBtn = document.getElementById('clear-schedule-btn');
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
    let cellColors = {};  // Formato simple para lógica interna (día-hora)
    let excelCellColors = {};  // Formato Excel para exportación (A1, B2, etc.)
    let excelCellTexts = {};  // Formato Excel para los textos de los cursos
    let totalCredits = 0; // Mover totalCredits aquí para scope global
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    // Cargar el color guardado en localStorage o usar el color por defecto
    const savedColor = localStorage.getItem('selectedColor') || '#90EE90';
    colorPicker.value = savedColor;

    // Guardar el color seleccionado en localStorage cuando cambie
    colorPicker.addEventListener('input', function() {
        const selectedColor = colorPicker.value;
        localStorage.setItem('selectedColor', selectedColor);
    });

    // Función para actualizar el total de créditos
    function updateTotalCredits() {
        const totalCreditsElement = document.getElementById('total-credits');
        if (totalCreditsElement) {
            totalCreditsElement.textContent = `Total de Créditos: ${totalCredits}`;
        }
    }

    // Función para guardar cursos en localStorage
    function saveCoursesToLocalStorage() {
        localStorage.setItem('savedCourses', JSON.stringify(selectedCourses));
        localStorage.setItem('savedCellColors', JSON.stringify(cellColors));
        localStorage.setItem('savedExcelColors', JSON.stringify(excelCellColors)); // Guardar también formato Excel
        localStorage.setItem('savedExcelTexts', JSON.stringify(excelCellTexts)); // Guardar también textos Excel
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
            // Restaurar la tabla visual basándose en cellColors
            restoreVisualSchedule();
        }
        if (savedExcelColors) {
            excelCellColors = JSON.parse(savedExcelColors);
        }
        if (savedExcelTexts) {
            excelCellTexts = JSON.parse(savedExcelTexts);
        }
        if (savedCredits) {
            totalCredits = parseInt(savedCredits) || 0;
            // Verificar si la función updateTotalCredits existe antes de llamarla
            if (typeof updateTotalCredits === 'function') {
                updateTotalCredits();
            }
        }
    }

    // Función para restaurar la visualización del horario
    function restoreVisualSchedule() {
        // Recorrer todas las posiciones guardadas en cellColors
        for (const cellPosition in cellColors) {
            const color = cellColors[cellPosition];
            const [dayIndex, hour] = cellPosition.split('-').map(Number);
            
            // Encontrar qué curso corresponde a esta posición
            for (const courseKey in selectedCourses) {
                const course = selectedCourses[courseKey];
                const [subject, sectionWithX] = courseKey.split('-');
                const section = sectionWithX.replace('X', '');
                
                // Calcular la posición en la tabla
                const rowIndex = hour - 8; // hour - 8 porque las horas empiezan en 8 y la primera fila de datos es 0
                const colIndex = dayIndex + 1; // dayIndex + 1 porque la primera columna es para las horas
                
                // Buscar la celda en la tabla
                if (scheduleTable.rows[rowIndex + 1] && scheduleTable.rows[rowIndex + 1].cells[colIndex]) {
                    const cell = scheduleTable.rows[rowIndex + 1].cells[colIndex];
                    
                    if (!cell.textContent.trim()) {
                        cell.textContent = `${subject} - ${section}`;
                        cell.classList.add('schedule-cell');
                        cell.style.backgroundColor = color;
                        cell.dataset.color = color;
                        
                        // Agregar botón de eliminar
                        const deleteBtn = document.createElement('button');
                        deleteBtn.classList.add('delete-button');
                        deleteBtn.innerHTML = 'X';
                        deleteBtn.addEventListener('click', () => deleteSchedule(cell));
                        cell.appendChild(deleteBtn);
                        
                        console.log("Restaurando:", subject, section, "en", days[dayIndex], hour + ":00", "Color:", color);
                        break;
                    }
                }
            }
        }
    }

    // Función para limpiar completamente el horario
    function clearCompleteSchedule() {
        // Limpiar la tabla visual
        for (let i = 1; i < scheduleTable.rows.length; i++) {
            const currentRow = scheduleTable.rows[i];
            for (let j = 1; j < currentRow.cells.length; j++) {
                const currentCell = currentRow.cells[j];
                currentCell.textContent = '';
                currentCell.style.backgroundColor = '#E6F7FF';
                currentCell.dataset.color = '';
                
                const deleteBtn = currentCell.querySelector('.delete-button');
                if (deleteBtn) {
                    currentCell.removeChild(deleteBtn);
                }
            }
        }
        
        // Limpiar datos y localStorage
        selectedCourses = {};
        cellColors = {};
        excelCellColors = {};
        excelCellTexts = {};
        totalCredits = 0;
        if (typeof updateTotalCredits === 'function') {
            updateTotalCredits();
        }
        
        localStorage.removeItem('savedCourses');
        localStorage.removeItem('savedCellColors');
        localStorage.removeItem('savedExcelColors');
        localStorage.removeItem('savedExcelTexts');
        localStorage.removeItem('savedTotalCredits');
        
        alert('Horario guardado limpiado exitosamente');
    }

    // Función auxiliar para convertir número de columna a letra
    function colNumToLetter(colNum) {
        let letter = '';
        while (colNum > 0) {
            let modulo = (colNum) % 26;
            letter = String.fromCharCode(modulo + 65) + letter;
            colNum = Math.floor((colNum - modulo - 1) / 26);
        }
        return letter;
    }

    // Función para eliminar un horario
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
                        
                        currentCell.style.backgroundColor = '#E6F7FF'; 
                        currentCell.dataset.color = ''; 

                        // Eliminar de ambos formatos
                        const dayIndex = j - 1; // j-1 porque j empieza en 1 (después de la columna de horas)
                        const hour = i + 7; // i+7 porque i empieza en 1 y las horas empiezan en 8
                        
                        // Formato simple
                        const cellId = `${dayIndex}-${hour}`;
                        if (cellColors[cellId]) {
                            delete cellColors[cellId]; 
                            console.log("Eliminando color simple:", cellId, "Día:", days[dayIndex], "Hora:", hour + ":00");
                        }
                        
                        // Formato Excel
                        const excelId = `${colNumToLetter(dayIndex + 2)}${hour - 6}`;
                        if (excelCellColors[excelId]) {
                            delete excelCellColors[excelId];
                            console.log("Eliminando color Excel:", excelId);
                        }
                        if (excelCellTexts[excelId]) {
                            delete excelCellTexts[excelId];
                            console.log("Eliminando texto Excel:", excelId);
                        }

                        const deleteBtn = currentCell.querySelector('.delete-button');
                        if (deleteBtn) {
                            currentCell.removeChild(deleteBtn);
                        }
                    }
                }
            }
            
            // Guardar los cambios en localStorage después de eliminar
            saveCoursesToLocalStorage();
        }
    }

    // Agregar event listener para el botón de limpiar
    clearScheduleBtn.addEventListener('click', clearCompleteSchedule);

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
                            const respuesta = await fetch("http://Cicilis.pythonanywhere.com/upload", {
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
            careerData = {};
            
            // NO limpiar el localStorage aquí para mantener los cursos guardados
            // selectedCourses = {};
            // cellColors = {};
            // localStorage.removeItem('savedCourses');
            // localStorage.removeItem('savedCellColors');
            // localStorage.removeItem('savedTotalCredits');
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

            // No necesitamos agregar el event listener aquí porque ya se agregó arriba
            // colorPicker.addEventListener('input', () => {
            //     const selectedColor = colorPicker.value;
            // });

            addScheduleBtn.addEventListener('click', addSchedule);

            exportImageBtn.addEventListener('click', exportToImage);
            exportExcelBtn.addEventListener('click', exportToExcel);
            createScheduleTable();
            totalCredits = 0; // Reset but don't redeclare
        }
        // totalCredits ya está declarado globalmente
        initializeSchedulePage(horariosData);
        
        // Cargar cursos guardados después de que todo esté inicializado
        setTimeout(() => {
            loadCoursesFromLocalStorage();
        }, 500); // Aumentar el tiempo para asegurar que la tabla esté lista

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
            

    
        // cellColors ya está declarado globalmente arriba

        // colNumToLetter ya está definida globalmente
        
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
                                console.error('Este curso ya ha sido agregado', storedCourse.asig);
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
                                            console.error(`Conflicto de horarios. No se pudo agregar el horario para ${selectedSubject} - ${selectedSection} el ${days[dayIndex]} a las ${hour}:00.`);
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
        
                                    // Guardar el color en ambos formatos
                                    // Formato simple para lógica interna
                                    const cellPosition = `${dayIndex}-${hour}`;  // Ejemplo: "0-9" para Lunes 9:00
                                    cellColors[cellPosition] = selectedColor;
                                    
                                    // Formato Excel para exportación
                                    const excelPosition = `${colNumToLetter(dayIndex + 2)}${hour - 6}`;  // Cambio: hour - 6 en lugar de hour - 7
                                    excelCellColors[excelPosition] = selectedColor;
                                    excelCellTexts[excelPosition] = `${selectedSubject} - ${selectedSection}`;
                                    
                                    console.log("Guardando color - Simple:", cellPosition, "Excel:", excelPosition, "Color:", selectedColor, "Texto:", `${selectedSubject} - ${selectedSection}`, "Día:", days[dayIndex], "Hora:", hour + ":00");
        
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
            
            // Guardar los cursos en localStorage después de agregar
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
                // Verificar que existen colores para exportar
                if (Object.keys(excelCellColors).length === 0) {
                    alert('No hay cursos con colores para exportar');
                    return;
                }

                const wb = XLSX.utils.table_to_book(scheduleTable, { sheet: 'Horarios' });
            
                // Crear un archivo Excel en memoria
                const excelFile = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            
                const formData = new FormData();
                formData.append('file', new Blob([excelFile], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), 'horarios_sin_colores.xlsx');
            
                // Enviar tanto colores como textos
                formData.append('cellColors', JSON.stringify(excelCellColors)); 
                formData.append('cellTexts', JSON.stringify(excelCellTexts)); 
                
                console.log('Enviando colores Excel:', excelCellColors);
                console.log('Enviando textos Excel:', excelCellTexts);
            
                fetch('http://cicilis.pythonanywhere.com/excel', {  // Cambiar a HTTP
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
                    console.error('Error al enviar el archivo:', error);
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
            

        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
});

