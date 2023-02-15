const tableDiv = document.querySelector("#table_body")
const pageNumsDiv = document.querySelector("#page")
let currPage = 1;  //Aktif sayfayı tutar
var numTodosPerPage//Sayfada kaç öğrenci olacağını tutar
var numPages       //Sayfa sayısını tutar
var lastItemIndex  //Sayfaya yazdırılıcak son öğrencinin indexini tutar
var firsItemIndex  //Sayfaya yazdırılıcak ilk öğrencinin indexini tutar     
var Students=[]    //Dataları tutan array

//Dataları json dosyasından alan fonksiyon
function get_data(){
    axios.get("http://localhost:3000/students").then(response=>{
      Students = response.data  
      opt(2)
})}
get_data();

//Sayfalarda gösterilecek öğrencileri belirleyen ve gösteren fonksiyon
function renderTable(){
    lastItemIndex = currPage*numTodosPerPage;
    firsItemIndex = lastItemIndex - numTodosPerPage;
    if(lastItemIndex>=Students.length){lastItemIndex=Students.length}
    const items = Students.slice(firsItemIndex, lastItemIndex);
    let template = '';
    items.forEach(item=>{
        template += `
            <tr class="d-flex">
                <td id="ad" class="col">${item.fname} ${item.lname}</td>
                <td id="no" class="col">${item.num}</td>
                <td id="bolum" class="col">${depts[parseInt(item.dept)]}</td>
                <td class="buttons d-flex align-items-center col">
                    <button class="btn border-0 mr-1 rounded btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick={sil(${item.id})} ><small>Sil</small></button>
                    <button class="btn border-0 mr-1 rounded btn-primary" data-toggle="modal" data-target="#ModalCenter" id="duz_btn" onclick={duzenle(${item.id})} ><small>Düzenle</small></button>
                    <button class="btn border-0  mr-1 rounded btn-success" data-toggle="modal" data-target="#ModalCenter2" onclick={detay(${item.id})} ><small>Detay</small></button>
                </td>
            </tr>
        `;
    })  
    template += ''
    tableDiv.innerHTML = template;
} 

//Sayfada istenen öğrenci sayısını belirleyen fonksiyon 
function opt(nums){
    list_items =document.querySelectorAll(".btn-outline-primary")
    list_items.forEach(
     item =>{ item.className ='btn btn-outline-primary'
     item.style.color="blue"});
    switch (nums) {
        case 1:
            numTodosPerPage=5   
            break;
        case 2:
            numTodosPerPage=8
            break;
        case 3:
            numTodosPerPage=10
            break;
        default:
            break;
    }
    list_items[nums-1].className = "btn btn-outline-primary bg-primary"
    list_items[nums-1].style.color="white"
    renderAll();
} 

//Students arrayinin boyutuna ve sayfada gösterilecek data sayısına göre sayfa sayısını belirleyen fonksiyon
function renderPageNums(){
    numPages = Math.ceil(Students.length/numTodosPerPage);
    if(numPages<currPage)currPage=numPages
    let template = '';
    for (let i=1; i<=numPages; i++){
        template += `<button style="margin:auto" 
        class="border border-secondary btn ${i==currPage? 'active': ''}"
        onclick="pageClicked(${i})">${i}</button>
        `;
    }
    pageNumsDiv.innerHTML = template;
}

//Son tıklanan sayfayı aktif sayfa olarak belirleyen fonksiyon
function pageClicked(pageNum){
    if (pageNum == currPage) return;
    currPage = pageNum;
    renderAll();
} 

//Toplam öğrenci sayısını ve her sayfada hangi öğrencilerin gösterildiğini yazan fonksiyon
function student_show(){
let text_stu = '<p class="m-0"><b>'+ Students.length +'</b>'+' öğrenciden <b>'+(firsItemIndex+1)+'-'+
lastItemIndex+'</b>'+' arası gösteriliyor </p>';
document.getElementById('num_students').innerHTML= text_stu;
}

//Pagination işlemlerinde değişiklik yapıldığında sayfayı yeniden değişikliklere uygun şekilde düzeyen fonksiyon
function renderAll(){
    renderPageNums();
    renderTable();
    student_show();
} // end-renderAll