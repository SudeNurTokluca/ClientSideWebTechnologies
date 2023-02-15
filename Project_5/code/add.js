window.addEventListener('DOMContentLoaded', ()=>{    
    let form = document.querySelector('form')
    form.addEventListener('submit', e => {
        e.preventDefault();
        form.classList.add('was-validated')
    })
  }) 

//Ekle Modal oluşturur ve doğrulama sağlandığı ise ekle() fonksiyonu çağıran fonksiyon.
function check_ekle(){

    //ModalCenter'ı Ekle Modal'a dönüştürürme
    document.querySelector('.modal-baslik').textContent='Eklenecek Öğrenci Bilgileri';
    document.querySelector('#kapat').textContent='Close';
    document.querySelector('#add_duz').textContent='Add';
    document.querySelector("#add_duz").setAttribute("data-dismiss","") 

    //Add butonuna tıklandığında gerçekleşen fonksiyon
    document.getElementById('add_duz').onclick = function() {

    //Girdiler için doğrulama sağlanıp sağlanmadığını kontrol eder.
    if(document.querySelector("#inputisim").checkValidity() && document.querySelector("#inputsoyisim").checkValidity() && 
    document.querySelector("#inputno").checkValidity() && document.querySelector("#inputbolum").checkValidity() &&
    document.querySelector("#dogumyer").checkValidity() && document.querySelector("#dogumtarih").checkValidity()) {
          ekle()
          document.querySelector("#add_duz").setAttribute("data-dismiss","modal") 
    }
          document.querySelector("#kapat").addEventListener("click", function() {
          let formm=document.querySelector('form');
          formm.classList.remove('was-validated');
    });
          document.querySelector("#kapat2").addEventListener("click", function() {
          let formm=document.querySelector('form');
          formm.classList.remove('was-validated');
    });
          window.addEventListener('keydown', function () {
          let formm=document.querySelector('form');
          formm.classList.remove('was-validated');
    })
  }
}

//Ekleme işlemini gerçekleştiren fonksiyon
function ekle(){
        document.querySelector('form').classList.add('was-validated');
        var isim=document.querySelector("#inputisim").value;
        var soyisim=document.querySelector("#inputsoyisim").value;
        var no=document.querySelector("#inputno").value;
        var bolum=document.querySelector("#inputbolum").value;
        var dogumyer=document.querySelector("#dogumyer").value;
        var dogumtarih=document.querySelector("#dogumtarih").value;   
        //Data eklenir
        axios({
          method: 'post',
          url: "http://localhost:3000/students",
          data: {
              "fname":isim,"lname":soyisim, "num":no,"dept":bolum,"pob":dogumyer,"dob":dogumtarih
          }
        })
        .then(res=>{
          const student = res.data;
          Students.push(student);
          renderAll();
         })
        document.querySelector("#add_duz").setAttribute("data-dismiss","modal") 
        delete_filled()
}

//Modal'a girilen değerleri temizleyen fonksiyon      
function delete_filled(){
    $(".modal").on("hidden.bs.modal", function(){
    document.querySelector("#inputisim").value=null;
    document.querySelector("#inputsoyisim").value=null;
    document.querySelector("#inputno").value=null;
    document.querySelector("#inputbolum").value="";
    document.querySelector("#dogumyer").value=null;
    document.querySelector("#dogumtarih").value="2000-10-10";
    document.querySelector('form').classList.remove('was-validated');
     } )}   