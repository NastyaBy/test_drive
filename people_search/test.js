//Эксземпляр класса SearchContact
let searcher;

//Событие на вывод найденных пользователей с debounce
let onInputChange =  debounce(async ()=>{
    await searcher.getContactsByPhone();
    searcher.searchArea.innerHTML = searcher.getContactsHtml();

},
    150);

//Класс отвечающий за хранени полей формы и поиск контактов
class SearchContact{

    constructor (){
        this.nameArea = document.getElementById("UF_CLIENT_NAME");
        this.inputArea = document.getElementById("UF_CLIENT_PHONE");
        this.searchArea = document.getElementById("contact_search");
        this.idArea = document.getElementById("UF_CONTACT_ID");
    }

    //Получение массива найденных контактов
    async getContactsByPhone(phone = ""){
        phone = this.inputArea.value;
        let request = await fetch("https://crm.atlantm.com/esoft/test-drive/requests/peoplesearchhttp.php?phone="+phone);
        let result = await request.json();
        this.contacts = result;
    }

    //Получение html со списком всех найденных контактов
    getContactsHtml(){
        let result = "";
        this.contacts.forEach((element, index)=>{
            result += "<div onclick='onSelectUser(this)' id="+index+">"+element.FULL_NAME+", "+element.PHONE+"</div>\n";
        });
        return result;
    }

}

//Событие при фокусе, для инициализации класса поиска, если нужно и заполнение его первыми данными
async function  onInputFocus(){
    if(!searcher)
        searcher = new SearchContact();
    searcher.searchArea.style="";
    await searcher.getContactsByPhone();
    searcher.searchArea.innerHTML = searcher.getContactsHtml();
}

//Сокрытие блока поиска при расфокусировке
function onInputUnFocus(){
    searcher.searchArea.style="display:none;";
}

//Подставление значений при выборе найденного контакта
function onSelectUser(event)
{   
    let selectedContact = searcher.contacts[event.id];
    searcher.nameArea.value = selectedContact.FULL_NAME;
    searcher.inputArea.value = selectedContact.PHONE;
    searcher.idArea.value = selectedContact.ID;
    searcher.searchArea.innerHTML = "";
}

//Декоратор для прерывания множественного вызова функции, позволяет ограничить вызов функции в определнном временном интервале 
function debounce(fargument, timeout){
    let isCooldown = false;

    return function() {
        if(isCooldown)
            return;

        fargument.apply(this, arguments);

        isCooldown = true;

        setTimeout(() => {
           isCooldown = false; 
        }, timeout);
    }
}