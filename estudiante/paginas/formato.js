// api.js
import axios from 'axios';

const apiUrl = 'http://localhost:1337';
//const tabla = 'api/dato1s';

//METODO PARA VER
export async function fetchData(nametable) {
    try {
      const response = await fetch(`${apiUrl}/${nametable}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw error;
    }
  }

  
  //METODO PARA CREAR
  export async function createData(newItem,nametable,prueba,prueba2,prueba3,prueba4,correoi,califasesorI,califasesorE) {
    try {
      const requestData = {
        data: {
          ...newItem,
          iddocumento: prueba,
          namedoc:prueba2,
          estado:prueba3,
          observaciones:prueba4,
          correo:correoi,
          califasesorI:califasesorI,
          califasesorE:califasesorE

        },
      };
      
      console.log('Esto es prueba', prueba);
      const response = await fetch(`${apiUrl}/${nametable}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (response.ok) {
        //const successMessage = 'Elemento creado con éxito';
        //alert(successMessage);
        return true;
      } else {
        //const errorMessage = 'Error al crear el elemento: ' + response.statusText;
        //alert(errorMessage);
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error('Error al crear el elemento:', error);
      throw error;
    }
  }


      //METODO PARA CREAR EVALUACION
      export async function agregarevaluacion(newItem,nametable) {
        try {
          const requestData = {
            data: {
              ...newItem
            },
          };
          
          
          const response = await fetch(`${apiUrl}/${nametable}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
          });
      
          if (response.ok) {
           // const successMessage = 'Elemento creado con éxito';
            //alert(successMessage);
            return true;
          } else {
           // const errorMessage = 'Error al crear el elemento: ' + response.statusText;
            //alert(errorMessage);
            throw new Error(response.statusText);
          }
        } catch (error) {
          console.error('Error al crear el elemento:', error);
          throw error;
        }
      }
  //METODO PARA CREAR STATUS
  //const [newItem2, setNewItem2] = useState({ idresi: '', iddoc: '',observaciones: '', status: '' });
  export async function crearstatus(resiid,docid,obv,sta,nametable) {
    try {
      const requestData = {
        data: {
          idresi:resiid,
          iddoc:docid,
          observaciones:obv,
          status:sta
         
        },
      };
      
      //console.log('Esto es prueba', prueba);
      const response = await fetch(`${apiUrl}/${nametable}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (response.ok) {
        const successMessage = 'Elemento creado con éxito';
        alert(successMessage);
        return true;
      } else {
        const errorMessage = 'Error al crear el elemento: ' + response.statusText;
        alert(errorMessage);
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error('Error al crear el elemento:', error);
      throw error;
    }
  }


  //METODO PARA ACTUALIZAR
  export async function updateData(id, updatedData,nametable) {
    try {
      const requestData = {
        data: {
          ...updatedData,
        },
      };
  
      const response = await fetch(`${apiUrl}/${nametable}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (response.ok) {
        //const successMessage = 'Elemento Actualizado con éxito';
        //alert(successMessage);
        return true;
      } else {
       // const successMessage = 'Error Al actualizar elemento!';
        //alert(successMessage);
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error('Error al actualizar el elemento:', error);
      throw error;
    }
  }
    //METODO PARA ACTUALIZAR DOCUMENTO
    export async function updateDataDoc(id, updatedData,nametable,prueba,prueba2) {
      try {
        const requestData = {
          data: {
            ...updatedData,
            iddocumento: prueba,
            namedoc:prueba2
          },
        };
    
        const response = await fetch(`${apiUrl}/${nametable}/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });
    
        if (response.ok) {
          const successMessage = 'Elemento Actualizado con éxito';
          alert(successMessage);
          return true;
        } else {
          const successMessage = 'Error Al actualizar elemento!';
          alert(successMessage);
          throw new Error(response.statusText);
        }
      } catch (error) {
        console.error('Error al actualizar el elemento:', error);
        throw error;
      }
    }
  //METODO PARA BORRAR
  export async function deleteData(id,nametable) {
    try {
      const response = await fetch(`${apiUrl}/${nametable}/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        //const successMessage = 'Exito borrar elemento!';
        //alert(successMessage);
        return true;
      } else {
        //const successMessage = 'Error borrar elemento!';
        //alert(successMessage);
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error('Error al eliminar el elemento:', error);
      throw error;
    }
  }
