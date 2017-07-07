/// <reference types="node-webcrypto-ossl" />
// @ts-check

const asn1js = require("asn1js");
// @ts-ignore
const pkijs = require("pkijs");
const crypto = new (require("node-webcrypto-ossl"));

const CERT_ENTRY = new Buffer("3082038D30820275A003020102020106300D06092A864886F70D01010B05003057310B30090603550406130252553111300F060355040813084D6172696A20456C311430120603550407130B596F73686B61722D4F6C61310D300B060355040A1304486F6D653110300E0603550403130754657374204341301E170D3137303730373137313730375A170D3137303830363137313730375A30143112301006035504030C0952534120636861696E30820122300D06092A864886F70D01010105000382010F003082010A0282010100B8DC9E0FF699D70181F0009A50854D8299328874DD85F47D95D12C2E983242DCC45A4B7B5423F17BD61C75D09276E656F57A5A6581481F10C688014600C0C7531C293795188521E21F26FB33297FF9654E7D72BEB473EB56D29C2861AE4091654123DB6C3AB7CA0A5953DA52EE6E808F202A6985E28003A0357D1DD63DB83B3D164D74E31DD35ED23DD5A0ACDB312D8EDA1AA069043D92A772CD3B17C34BF264E067B74AA5A270001AD359AFBD2F091635A9EE6AAF4D7CA8A39B7929764419282573C4681D9330BE21B9E0AF4C15BB07A421C0013920DF7D84C705A9BCD3FF74C8FCFE64C5563DED21E774F61A181ED3E4D3EA1994CF66BD0F1FAD493D2F4C5D0203010001A381A63081A3301D0603551D0E04160414F63AB27D66E654B7FA7BE988EE70287D33C43EBC3081810603551D23047A30788014C56AEB9101D56C1CD210C423DA50325420890929A15DA45B3059310B30090603550406130252553111300F060355040813084D6172696A20456C311430120603550407130B596F73686B61722D4F6C61310D300B060355040A1304486F6D6531123010060355040313095465737420526F6F74820103300D06092A864886F70D01010B050003820101000F2915C8D5AE4468A4129D7936F5AF9DCF782305D1D2ACDE93D1B75DD2B620E7B20116640FF87F03D1FD0437DB8FF243A0036079B09C7BE2B9BB0A6D198E00E0F046DB273CDA2EC6B421B8C49C1F0146DBC5515377BE40B10F8A39B3409AE5CB6ECCC738E128E450F06E51EDBC76535EBEA2CD7F52472C26FA18431F191F36D191E2A6D43006E6BF07E6C8F8948FB6785C374496BD7D5C421F773DF46BEF2E66D8C133584EE7D91C0851D7B1FCAB215FD6754F186A0ED01192457BA0D8EFAF69D94FD8289B6918C072FE2AFD648D1FDA9059CE9D9F1B405F10A81FCC6046C76211A6F67D8587FB96F9CFD6D4C731B0FF1243928FF92A070173E342B043B6DBB7", "hex");
const CERT_CA = new Buffer("3082041D30820305A003020102020103300D06092A864886F70D01010B05003059310B30090603550406130252553111300F060355040813084D6172696A20456C311430120603550407130B596F73686B61722D4F6C61310D300B060355040A1304486F6D6531123010060355040313095465737420526F6F74301E170D3137303632383037323231395A170D3138303631393037323231395A3057310B30090603550406130252553111300F060355040813084D6172696A20456C311430120603550407130B596F73686B61722D4F6C61310D300B060355040A1304486F6D653110300E060355040313075465737420434130820122300D06092A864886F70D01010105000382010F003082010A0282010100A01DB72505C36CE9C0B349C8C1B186D5305194468FEF4C73EDFEE374BE84DCEBF3CC5707E3A1F50508AFBE6C91AA732D2B873560BE287E3D8041C61484965DB635FB5C7F76A266F62E9FE83880C54E56405BA3AB9C557B880DEB496B5DBC352EAAF88EDA109B74C8E6F6EE816F4D53E18D68229ACD0D594E49A6BD30AB4F9D7A12FF2B5D2FBC4F320FBC077D522EB9270923EB982D1C291637E88E3C5516B1257604A2C4DFBBC5880295137976A5D1C114D225FF418F14B1698C686B47733FE9B9563E3FD5E0C9575063BA510FE4B1C217E7931CF64A5BD3020E3D04F9AD9616815091A2F2213118D6CDC1D13F7BB4940E2442A995C9E02CDDD465DB188564B70203010001A381F13081EE300C0603551D13040530030101FF301D0603551D0E04160414C56AEB9101D56C1CD210C423DA5032542089092930818B0603551D230481833081808014A3BC013167D68EBCC6DDFCF7D5FCD5FBD442E729A15DA45B3059310B30090603550406130252553111300F060355040813084D6172696A20456C311430120603550407130B596F73686B61722D4F6C61310D300B060355040A1304486F6D6531123010060355040313095465737420526F6F74820900EA08E4B0D7975F0530310603551D1F042A30283026A024A0228620687474703A2F2F6C6F63616C686F73743A333030312F63726C5F63612E70656D300D06092A864886F70D01010B05000382010100710E4AB16B6A6687DD8F2BC4E89D7D3CECDAFF6855602A8E7F8A361E785D9A25476EC88C541FD8A98A7EAA908B35E907702384CA97DD09A23B78A829F3DE6854FFED078DAB50BCC2F5793EEC3EB3E1F6E47598B69FEE04C086DA383B2FCB4F5C20D4F6B1DC03B413B71E23B62BD29AE551604E6C4CF5580CAB182F2DD021FD311A5642336DE4A34E7E394BE44FD092A40D68324EDE271C44779B1AC4DB19738A0306A3BA18C346B8401AA727173E5F5657ECD4D5C92A2B625068B01A291AF9AEA8A8954BCB75C675CE15A0446A8B0B91AC97B7D71B691DD08A6298E0E198C7D5217295C05E8CCDE88FA3422E3A9B7485B005E73168DFB43260478EB508666D44", "hex");
const CERT_ROOT = new Buffer("3082042930820311A003020102020900EA08E4B0D7975F05300D06092A864886F70D01010B05003059310B30090603550406130252553111300F060355040813084D6172696A20456C311430120603550407130B596F73686B61722D4F6C61310D300B060355040A1304486F6D6531123010060355040313095465737420526F6F74301E170D3137303632383037323231375A170D3232303632383037323231375A3059310B30090603550406130252553111300F060355040813084D6172696A20456C311430120603550407130B596F73686B61722D4F6C61310D300B060355040A1304486F6D6531123010060355040313095465737420526F6F7430820122300D06092A864886F70D01010105000382010F003082010A0282010100A7CF1EEBCB9DB1736009C3744B9CD1E1C078D71D1D61B1BFF6782298C3A87265F62B482B6A19F5ACAEEDE4551A7BC5EE7B4EFE477DD8B1B2137F60BA6DADF07035957C24C3AF02F7EDE54E0C8E24E07544CF1205D90BD9BB806B797F90B9956847094ABDB03F8FA572F50EFB687812C5E15CFD62709F1A737C7F6C896A1A6D8B8182B727C3C2E04F7615CB3DBE87CF487B558BF7BC0A6784ADC43C766645ED8AB8BEFC2A0E08F3214D0CEC4327094572C6BE35D660BF32FE03EF07528EA9D6A1CF30B1EAC9C0F582A4DE84D6187AA5FA81E73352C2F95351E79B4B6F1BBC223EE047103B930C424CB76239A52627F8D435658F9809A14229A4792746525EFC970203010001A381F33081F0300C0603551D13040530030101FF301D0603551D0E04160414A3BC013167D68EBCC6DDFCF7D5FCD5FBD442E72930818B0603551D230481833081808014A3BC013167D68EBCC6DDFCF7D5FCD5FBD442E729A15DA45B3059310B30090603550406130252553111300F060355040813084D6172696A20456C311430120603550407130B596F73686B61722D4F6C61310D300B060355040A1304486F6D6531123010060355040313095465737420526F6F74820900EA08E4B0D7975F0530330603551D1F042C302A3028A026A0248622687474703A2F2F6C6F63616C686F73743A333030312F63726C5F726F6F742E70656D300D06092A864886F70D01010B050003820101002C425AFFCCCC2A2A83E4EB857374BB7E9CF41F19EB74F6E3C319BEE145628394ADE83C4BB38DACCBEE3451D269E5C7154C4A7DAEDFCC541B8E6C5DBB2131A49305D3F0EFC0AF30D1130B2EE9CCA8875AABFDABF906C829D3498AD5775164219AE3FA2B3F1F05524C475FF8B690A919822746F61F91460E0FD6D734145AAD63DEE4C9A2518E3E23A3C5FA5597AD4CB0FF95DA79F3B9974CCE3D618E7F2EC2AEEF439C03A323F063CD50F635E0941F656A2CAB75FD6011B1E42035E7B00089FA8E3FA9767E602A6EAF63804CE6E838BA4D5E0E62033685B7C2E3D1B67AB4B2BA47A177E6FBF6D270EB93B3909A98CF6E2456D87DC355B2C4DD29C05BBEBA114081", "hex");

function parseCert(buf) {
    const arrayBuf = new Uint8Array(buf).buffer;
    const asn1 = asn1js.fromBER(arrayBuf);
    const pkiCert = new pkijs.Certificate({ schema: asn1.result });
    return pkiCert;
}

const cert = parseCert(CERT_ENTRY);
const ca = parseCert(CERT_CA);
const root = parseCert(CERT_ROOT);

const certs = [root, ca, cert];

pkijs.setEngine("OpenSSL", crypto, crypto.subtle);
const chainBuilder = new pkijs.CertificateChainValidationEngine({
    certs,
});

chainBuilder.verify()
    .then((chain) => {
        console.log(chain);
    })
    .catch((err) => {
        console.error(err);
    })