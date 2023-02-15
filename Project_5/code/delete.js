let data_id //Silinmesi istenen datanın id'sini tutar.
//İstenen id'ye sahip datayı silmek için onay alan fonksiyon
function sil(id){
    Students.forEach(item=>{
     if(id==item.id){
        data_id=item.id
        document.getElementById('uyariSil').textContent=item.fname+" "+item.lname+" isimli öğrenciyi siliyorsunuz. Bu işlem geri alınamaz. Devam etmek istediğinize emin misiniz?";
     }
 })
}
//Datayı silen fonksiyon
function delete_data(){
    axios.delete("http://localhost:3000/students/"+(data_id))
    .then(res=>{
        Students = Students.filter(student=>student.id != data_id)
        renderAll();
    })
}
