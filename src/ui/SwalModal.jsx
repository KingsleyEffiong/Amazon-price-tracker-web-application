import React from 'react';
import Swal from 'sweetalert2';

function SwalModal({ title, message, icon = 'info', confirmText = 'OK', onConfirm }) {
    Swal.fire({
        title: title,
        text: message,
        icon: icon,
        confirmButtonText: confirmText
    }).then((result) => {
        if (result.isConfirmed && onConfirm) {
            onConfirm(); // Execute the callback if provided
        }
    });

    return null; // No need to render anything
}

export default SwalModal;
