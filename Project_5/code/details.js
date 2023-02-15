//İstenen datanın id'si yardımıyla detaylarını yazdıran fonksiyon
function detay(id){
    axios.get("http://localhost:3000/students/"+(id)).then(response=>{
    let student = response.data
    document.getElementById('detIsim').value=student.fname
    document.getElementById('detSoyisim').value=student.lname;
    document.getElementById('detNo').value=student.num;
    document.getElementById('detBolum').value=depts[parseInt(student.dept)];
    document.getElementById('detDogYer').value=student.pob;
    document.getElementById('detDogTar').value=student.dob;
})
}