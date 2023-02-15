//Düzenleme işlemlerini gerçekleştiren fonksiyon  
function duzenle(id){
    data_id=id
    //ModalCenter'ı Ekle Modal'a dönüştürürme
    document.querySelector('.modal-baslik').textContent='Öğrenciyi Düzenle';
    document.querySelector('#kapat').textContent='Vazgeç';
    document.querySelector('#add_duz').textContent='Onayla';
    document.getElementById('bolumsec').setAttribute('disabled','');
    document.querySelector("#add_duz").setAttribute("data-dismiss","") 
    //İstenen id'ye sahip datanın bilgilerini yazdırır
    Students.forEach(item=>{
        if(id==item.id){
        document.getElementById('inputisim').value=item.fname
        document.getElementById('inputsoyisim').value=item.lname;
        document.getElementById('inputno').value=item.num;
        document.getElementById('inputbolum').value=item.dept;
        document.getElementById('dogumyer').value=item.pob;
        document.getElementById('dogumtarih').value=item.dob;
        }})
    //Onayla butonuna tıklandığında gerçekleşen fonksiyon
    document.getElementById('add_duz').onclick = function() {
            //Girdiler için doğrulama sağlanıp sağlanmadığını kontrol eder.
            if(document.querySelector("#inputisim").checkValidity() && document.querySelector("#inputsoyisim").checkValidity() && 
            document.querySelector("#inputno").checkValidity() && document.querySelector("#inputbolum").checkValidity() &&
            document.querySelector("#dogumyer").checkValidity() && document.querySelector("#dogumtarih").checkValidity()) {
                document.querySelector("#add_duz").setAttribute("data-dismiss","modal") 
                //İstenen data güncellenir
                axios({
                    method: 'put',
                    url: "http://localhost:3000/students/"+(data_id),
                    data: {
                        "fname":document.getElementById('inputisim').value,
                        "lname":document.getElementById('inputsoyisim').value,
                        "num":document.getElementById('inputno').value,
                        "dept":document.getElementById('inputbolum').value,
                        "pob":document.getElementById('dogumyer').value,
                        "dob":document.getElementById('dogumtarih').value}
                    }).then(res=>{
                            const student = res.data;
                            Students.forEach(item=>{
                            if(student.id==item.id){
                            item.fname=document.getElementById('inputisim').value,
                            item.lname=document.getElementById('inputsoyisim').value,
                            item.num=document.getElementById('inputno').value,
                            item.dept=document.getElementById('inputbolum').value,
                            item.pob=document.getElementById('dogumyer').value,
                            item.dob=document.getElementById('dogumtarih').value
                            }})
                            renderAll();
                    })
            }}
        delete_filled()  
}