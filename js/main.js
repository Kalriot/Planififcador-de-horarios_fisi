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
    const careerData = {};
    const days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

    fetch('data/Fisi.json')
        .then(response => response.json())
        .then(horariosData => {
            createScheduleTable();

            careerSelect.insertAdjacentHTML('afterbegin', '<option value="">---</option>');
            for (const career in horariosData) {
                const option = document.createElement('option');
                option.value = career;
                option.textContent = career;
                careerSelect.appendChild(option);

                // Almacenar los datos de la carrera en el objeto careerData
                careerData[career] = horariosData[career];
            }

            // Evento al seleccionar una carrera
            careerSelect.addEventListener('change', updateCycles);

            // Eventos al seleccionar un ciclo y una asignatura
            cycleSelect.addEventListener('change', updateSubjects);
            subjectSelect.addEventListener('change', updateSections);

            // Habilitar el botón "Agregar Horario" cuando todas las selecciones estén completas
            sectionSelect.addEventListener('change', () => {
                addScheduleBtn.disabled = !(cycleSelect.value && subjectSelect.value && sectionSelect.value);
            });

            // Mostrar el selector de color al hacer clic en el botón
            colorPicker.addEventListener('input', () => {
                // Obtener el color seleccionado
                const selectedColor = colorPicker.value;
                // Puedes hacer cualquier cosa con el color seleccionado aquí
            });
            // Agregar horario a la tabla
            addScheduleBtn.addEventListener('click', addSchedule);

            // Exportar a imagen
            exportImageBtn.addEventListener('click', exportToImage);

            // Exportar a Excel
            exportExcelBtn.addEventListener('click', exportToExcel);

            function updateCycles() {
                const selectedCareer = careerSelect.value;
                const selectedCareerData = careerData[selectedCareer];
            
                // Limpiar y agregar la opción por defecto "---" al selector de ciclo
                cycleSelect.innerHTML = '';
                const defaultCycleOption = document.createElement('option');
                defaultCycleOption.value = '';
                defaultCycleOption.textContent = '---';
                cycleSelect.appendChild(defaultCycleOption);
            
                subjectSelect.innerHTML = '';
                sectionSelect.innerHTML = '';
            
                if (selectedCareerData) {
                    for (const cycle in selectedCareerData) {
                        const option = document.createElement('option');
                        option.value = cycle;
                        option.textContent = cycle;
                        cycleSelect.appendChild(option);
                    }
                }
            
                updateSubjects();
            }

            function updateSubjects() {
                const selectedCareer = careerSelect.value;
                const selectedCycle = cycleSelect.value;

                subjectSelect.innerHTML = '';
                sectionSelect.innerHTML = '';

                const subjectsSet = new Set();

                if (selectedCareer && selectedCycle) {
                    const coursesInCycle = careerData[selectedCareer][selectedCycle];

                    if (coursesInCycle) {
                        coursesInCycle.forEach(courseSection => {
                            subjectsSet.add(courseSection['Asignatura'].match(/-(.+)/)[1].trim());
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
                const selectedCycle = cycleSelect.value;
                const selectedSubject = subjectSelect.value;

                sectionSelect.innerHTML = '';

                const sectionsSet = new Set();

                if (selectedCareer && selectedCycle && selectedSubject) {
                    const coursesInCycle = careerData[selectedCareer][selectedCycle];

                    if (coursesInCycle) {
                        coursesInCycle.forEach(courseSection => {
                            if (courseSection['Asignatura'].match(/-(.+)/)[1].trim() === selectedSubject) {
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

                addScheduleBtn.disabled = !(selectedCycle && selectedSubject && sectionSelect.value);
            }

            function addSchedule() {
                const selectedCareer = careerSelect.value;
                const selectedCycle = cycleSelect.value;
                const selectedSubject = subjectSelect.value;
                const selectedSection = sectionSelect.value;
                const selectedColor = colorPicker.value;
            
                let conflictoEncontrado = false;
            
                const coursesInCycle = careerData[selectedCareer][selectedCycle];
            
                if (coursesInCycle) {
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
            
                                        if (cell.textContent.trim().length > 0) {
                            
                                            console.error(`Conflicto de horarios. No se pudo agregar el horario para ${selectedSubject} - ${selectedSection} el ${days[dayIndex]} a las ${hour}:00.`);
                                            alert(`Conflicto de horarios. No se pudo agregar el horario para ${selectedSubject} - ${selectedSection} el ${days[dayIndex]} a las ${hour}:00.`);
                                            conflictoEncontrado = true;
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
                    });
                }
            
                if (!conflictoEncontrado) {
                    // Si no hay conflicto, agrega el horario
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
            
                                        // Crear el botón Eliminar y asignar el evento solo si hay contenido en la celda
                                        if (cell.textContent.trim().length > 0) {
                                            const deleteBtn = document.createElement('button');
                                            deleteBtn.classList.add('delete-button');
                                            deleteBtn.innerHTML = 'X';
                                            deleteBtn.addEventListener('click', () => deleteSchedule(cell));
            
                                            // Agregar el botón a la esquina superior izquierda de la celda
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
                // Oculta los botones de eliminación antes de tomar la captura de pantalla
                const deleteButtons = document.querySelectorAll('.delete-button');
                deleteButtons.forEach(button => button.classList.add('hidden'));
            
                html2canvas(document.getElementById('schedule-table'), {
                    onclone: (documentClone) => {
                        // Muestra los botones de eliminación en el clon antes de la captura de pantalla
                        const deleteButtonsClone = documentClone.querySelectorAll('.delete-button');
                        deleteButtonsClone.forEach(buttonClone => buttonClone.classList.remove('hidden'));
                    }
                }).then(function (canvas) {
                    // Muestra los botones de eliminación después de tomar la captura de pantalla
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
                const wb = XLSX.utils.table_to_book(scheduleTable, { sheet: 'Horarios' });
                XLSX.writeFile(wb, 'horarios.xlsx');
            }

            function createScheduleTable() {
                const intervals = Array.from({ length: 14 }, (_, i) => i + 8);
            
                // Crear la fila de encabezados
                const headerRow = scheduleTable.insertRow(0);
                headerRow.insertCell(0);
            
                // Agregar encabezados de días
                days.forEach(day => {
                    const headerCell = headerRow.insertCell();
                    headerCell.textContent = day;
                });
            
                // Crear las filas de intervalos y horarios
                intervals.forEach(interval => {
                    const row = scheduleTable.insertRow();
                    const intervalCell = row.insertCell(0);
                    intervalCell.textContent = `${interval}:00 - ${interval + 1}:00`;
            
                    days.forEach(day => {
                        const cell = row.insertCell();
                        cell.classList.add('schedule-cell');
                        cell.textContent = '';
            
                        // Agregar el botón "Eliminar" solo a las celdas de horarios
                        if (interval >= 8) {
                            const deleteBtnContainer = document.createElement('div');
            
                            const deleteBtn = document.createElement('button');
                            deleteBtn.textContent = 'Eliminar';
                            deleteBtn.addEventListener('click', () => deleteSchedule(cell));
            
                            // Agregar el botón solo si la celda tiene contenido
                            if (cell.textContent.trim().length > 0) {
                                deleteBtnContainer.appendChild(deleteBtn);
                                cell.appendChild(deleteBtnContainer);
                            }
                        }
                    });
                });
            }
            
            function deleteSchedule(cell) {
                // Obtener la asignatura y sección de la celda original
                const courseInfo = cell.textContent.trim().split('-');
                const selectedSubject = courseInfo[0].trim();
                const selectedSection = courseInfo[1].trim();
            
                // Iterar sobre todas las filas y eliminar las celdas relacionadas con la asignatura y sección
                for (let i = 1; i < scheduleTable.rows.length; i++) {
                    const currentRow = scheduleTable.rows[i];
            
                    // Iterar sobre todas las celdas de la fila y eliminar las relacionadas con la asignatura y sección
                    for (let j = 1; j < currentRow.cells.length; j++) {
                        const currentCell = currentRow.cells[j];
            
                        // Verificar si la celda contiene la misma asignatura y sección
                        if (currentCell.textContent.includes(selectedSubject) && currentCell.textContent.includes(selectedSection)) {
                            // Restaurar el contenido y color original de la celda
                            currentCell.textContent = '';
                            currentCell.style.backgroundColor = '#E6F7FF';
                            currentCell.dataset.color = '';
            
                            // Eliminar el botón de la celda si existe
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
