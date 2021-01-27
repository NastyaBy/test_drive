<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Журнал Тест");
?>
<?
include "index.html";
$APPLICATION->AddHeadScript("/esoft/test-drive/people_search/test.js");
?>

<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>