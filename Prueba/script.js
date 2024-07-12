let transacciones = [];

//Agregar una transacción
function agregarTransaccion(event) {
    event.preventDefault(); 
    const form = event.target;
    const formData = new FormData(form);
    const transaccion = {};
    formData.forEach((value, key) => {
        transaccion[key] = value;
    });
    transacciones.push(transaccion);
    actualizarTabla();
    form.reset(); 
}

//Actualizar la tabla de transacciones
function actualizarTabla() {
    const tabla = document.querySelector('.tabladetransaccion table');
    tabla.innerHTML = `
        <tr class="border-b-2 rounded border-indigo-500">
            <th class="text-left py-2 px-3 bg-indigo-400">Tipo</th>
            <th class="text-left py-2 px-3 bg-indigo-400">Fecha</th>
            <th class="text-left py-2 px-3 bg-indigo-400">Categoría</th>
            <th class="text-left py-2 px-3 bg-indigo-400">Valor</th>
            <th class="text-left py-2 px-3 bg-indigo-400">Descripción</th>
            <th class="text-left py-2 px-3 bg-indigo-400">Editar</th>
        </tr>
        ${transacciones.map((transaccion, index) => `
            <tr>
                <td class="text-left py-2 px-3">${transaccion.tipo}</td>
                <td class="text-left py-2 px-3">${transaccion.fecha}</td>
                <td class="text-left py-2 px-3">${transaccion.categoria}</td>
                <td class="text-left py-2 px-3">${transaccion.valor}</td>
                <td class="text-left py-2 px-3">${transaccion.descripcion || '-'}</td>
                <td class="text-left py-2 px-3"><button onclick="abrirModalEditar(${index})" class="bg-indigo-400 w-full py-2 rounded type="submit">Editar</button></td>
            </tr>
        `).join('')}
    `;
}

//Abrir modal de edición con los datos de la transacción seleccionada
function abrirModalEditar(index) {
    const transaccion = transacciones[index];
    document.getElementById('tipoEdit').value = transaccion.tipo;
    document.getElementById('valorEdit').value = transaccion.valor;
    document.getElementById('categoriaEdit').value = transaccion.categoria;
    document.getElementById('fechaEdit').value = transaccion.fecha;
    document.getElementById('descripcionEdit').value = transaccion.descripcion || '';
    document.getElementById('modal').classList.remove('hidden');
}

//Cerrar el modal de edición
document.getElementById('closeModalButton').addEventListener('click', function() {
    document.getElementById('modal').classList.add('hidden');
});

//Guardar cambios en la transacción editada
document.getElementById('formAgregar').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const editedTransaccion = {};
    formData.forEach((value, key) => {
        editedTransaccion[key] = value;
    });
    transacciones.splice(editIndex,5, editedTransaccion);
    actualizarTabla();
    document.getElementById('modal').classList.add('hidden');
});

document.getElementById('formAgregar').addEventListener('submit', agregarTransaccion);
