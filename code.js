var btnCheck = document.querySelector("#btn-checker")
var dateOfBirth = document.querySelector("#birth-date")
var output = document.querySelector(".output-message")
var loadingGif = document.getElementById("#loader")

let count = 0;



function delayHandler(){
   
output.innerText = "Loading..."

setTimeout(clickHandler, 2000)
}

function clickHandler() {
    var birthDate = dateOfBirth.value;  

    if (birthDate) {
        birthDate = birthDate.split('-')
        dateFormat = {
            date: Number(birthDate[2]),
            month: Number(birthDate[1]),
            year: Number(birthDate[0])
        }
        var datesWithZero = dateZeroAdder(dateFormat);
        var getAllDateFormats = allDateFormats(datesWithZero);
        var reversedDates = reverseString(getAllDateFormats);
        var palindromeCheck= isPalindrome(reversedDates, getAllDateFormats)
        if (palindromeCheck === true) {
            output.innerText = "Yay! Your Birthday is a Palindrome"
        }
        else {
          var[counterNext, palindromeDate] = getNextPalindromeDate(datesWithZero)
          var [counterRev, palindromeDateRev] = getReversePalindromeDate(datesWithZero)
 
          if(counterNext< counterRev){
            output.innerText ="Oops! Your birthday is not Palindrome. You missed by "+ counterNext + " days. Recent Palindrome date to your Birthday is " + palindromeDate.date +"-" +palindromeDate.month+ "-" + palindromeDate.year +". It is "+ counterNext + " days ahead."
          }
          else {
            output.innerText ="Oops! Your birthday is not Palindrome. You missed by "+ counterRev + " days. Recent Palindrome date to your Birthday is " + palindromeDateRev.date +"-" +palindromeDateRev.month+ "-" + palindromeDateRev.year + ". It is "+ counterRev + " days ago."
          }




        }



    }
    else {
        output.innerText = "Please Enter date of birth"
    }
}

function dateZeroAdder(dateFormat) {

    if (dateFormat.date < 10) {
        dateFormat.date = '0' + dateFormat.date;

    } else {
        dateFormat.date = dateFormat.date.toString();
    }

    if (dateFormat.month < 10) {
        dateFormat.month = '0' + dateFormat.month;

    } else {
        dateFormat.month = dateFormat.month.toString();
    }
    dateFormat.year = dateFormat.year.toString()

    return dateFormat;
}



function allDateFormats(dateFormat) {
    var ddmmyyyy = dateFormat.date + dateFormat.month + dateFormat.year;
    var mmddyyyy = dateFormat.month + dateFormat.date + dateFormat.year;
    var yyyymmdd = dateFormat.year + dateFormat.month + dateFormat.date;
    var ddmmyy = dateFormat.date + dateFormat.month + dateFormat.year.slice(-2);
    var mmddyy = dateFormat.month + dateFormat.date + dateFormat.year.slice(-2);
    var yymmdd = dateFormat.year.slice(-2) + dateFormat.month + dateFormat.date;
    var dateStrings = [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
    return dateStrings;
}




function reverseString(dateStrings) {
    var arrayList = []
    for (i = 0; i < dateStrings.length; i++) {
        var dateSplit = dateStrings[i].split('');
        var dateReverse = dateSplit.reverse();
        var dateJoin = dateReverse.join('');
        arrayList.push(dateJoin);
    }
    return arrayList;
}


function isPalindrome(dateJoin, dateStrings) {

    var flag = false;
 for(i=0;i<dateJoin.length;i++){
    if(dateJoin[i] === dateStrings[i]){
        flag =  true;
        break;
    } 
}
return flag;
}

function nextDate(dateFormat) {


    var dateGiven = Number(dateFormat.date);
    var monthGiven = Number(dateFormat.month);
    var yearGiven = Number(dateFormat.year);
    dateGiven = dateGiven + 1;


    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]


    if (dateGiven > daysInMonth[monthGiven - 1]) {

        leapYearCheck(dateFormat)
        if (leapYearCheckValue) {
            if (monthGiven === 2) {
                if (dateGiven > 29) {
                    dateGiven = 1;
                    monthGiven = monthGiven + 1;
                }
                else {
                    dateGiven = dateGiven;
                }
            }
        } else {
            dateGiven = 1;
            monthGiven = monthGiven + 1;

            if (monthGiven > 12) {
                monthGiven = 1;
                dateFormat.year = dateFormat.year + 1;
            } else {
                monthGiven = monthGiven;
            }

        }

    }
    else {
        dateGiven = dateGiven;
    }
    var nextDateGiven = {
        date: dateGiven,
        month: monthGiven,
        year: yearGiven
    }


    return nextDateGiven;
}


function getNextPalindromeDate(datesWithZero) {
    var counter = 0;
    var nextDateCalculated = nextDate(datesWithZero);
 
    while(1){
        counter++;
        var nextDateWithZero = dateZeroAdder(nextDateCalculated);
        var allNextDateFormats = allDateFormats(nextDateWithZero);
        var allReversedDates = reverseString(allNextDateFormats);
       var palindromeChecker=  isPalindrome(allReversedDates, allNextDateFormats)
      
        if(palindromeChecker == true){
            break;
        }
        nextDateCalculated = nextDate(nextDateWithZero);

    }
return [counter, nextDateWithZero]
}

function getReversePalindromeDate(datesWithZero){
    var counter = 0;
    var reverseDateCalculated = getReverseDate(datesWithZero);
 
    while(1){
        counter++;
        var nextDateWithZero = dateZeroAdder(reverseDateCalculated);
        var allNextDateFormats = allDateFormats(nextDateWithZero);
        var allReversedDates = reverseString(allNextDateFormats);
       var palindromeChecker=  isPalindrome(allReversedDates, allNextDateFormats)
      
        if(palindromeChecker == true){
            break;
        }
        reverseDateCalculated = getReverseDate(nextDateWithZero);

    }
return [counter, nextDateWithZero]

}

function getReverseDate(dateFormat){

    
    var dateGiven = Number(dateFormat.date);
    var monthGiven = Number(dateFormat.month);
    var yearGiven = Number(dateFormat.year);
    dateGiven = dateGiven - 1;


    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]


    if (dateGiven < 1 ) {

        leapYearCheck(dateFormat)
        if (leapYearCheckValue) {
            if (monthGiven === 3) {
                if (dateGiven< 1) {
                    dateGiven = 29 ;
                    monthGiven = monthGiven - 1;
                }
                else {
                    dateGiven = dateGiven;
                }
            }
        } else {
            dateGiven = daysInMonth[monthGiven-2];
            monthGiven = monthGiven - 1;

            if (monthGiven <1 ) {
                monthGiven = 12;
                dateFormat.year = dateFormat.year- 1;
            } else {
                monthGiven = monthGiven;
            }

        }

    }
    else {
        dateGiven = dateGiven;
    }
    var reverseDateGiven = {
        date: dateGiven,
        month: monthGiven,
        year: yearGiven
    }


    return reverseDateGiven
    

}




function leapYearCheck(dateFormat) {
    leapYearCheckValue = false;
    if (dateFormat.year % 400 === 0) {
        leapYearCheckValue = true;
    }
    if (dateFormat.year % 4 === 0) {
        leapYearCheckValue = true;
    }
    return leapYearCheckValue;
}














btnCheck.addEventListener("click", delayHandler)









