/**
 * Uses OpenPGP js to encrypt the contents of a form with my public key.
 * See: http://openpgpjs.org
 * ToDo: Add signature to encrypted message.
 */
function encrypt() {
  if (window.crypto.getRandomValues) {
    if ($('#button').html() === "Encrypt") {
      var pubkey = "-----BEGIN PGP PUBLIC KEY BLOCK-----\n" +
                   "\n" +
                   "mQINBFqqWBsBEAC6OWXkxZVI65ZyopLTjEgybv0z2LhbZ5x0a+taG8FFk4YinP1/\n" +
                   "a0npGIum/owcGZesq4OrRAo/Dvc7ZJJB54oBXP5TLxEu1dMly9vVgXzE6JjYma7K\n" +
                   "4o+I3MyggSSK+BJ4wosSZNaCzZOtf434QF7VgSjux97wc0/hAobcPSLO5LsxDp8c\n" +
                   "8dtPE6xrje+56fje6Yd6293sXRffnOV480pBfeGS5ARtj/ukFMTcrinl+qODd9HX\n" +
                   "6Kwr6VQf+Im7hEBOe5JvDCKWrhp1GfixIU38/TnsS02hATPErMGPhvLNBxbP2NYi\n" +
                   "FJFw8OU0zZ6smPiwnHR5NOukqMiqfrP1DgUeZvNTFpGSUKASFvwlSPqrUiaga/O6\n" +
                   "UrbWSKr20ata04CRzEzMstMmtMv+3sHWIGmzZsHJ/NVUlv4BLcLukXSYbeA29xwf\n" +
                   "XtGitRi6FAPpWNYycrLg/nrPxWN0kceLG2lTNFxjeCBDy3VkywC5X6dFLqpI6kuc\n" +
                   "4z9YGL/TN5sqZWjCGB/2QoAfejKXiWLbmc+K391DgNA4vYOaUMpaMhgAaJxJE7mT\n" +
                   "WKTHYPvCJ7f52ccHtBb/ha2G5OmogLVk8JMMz6fo2L29blNqAcYqneZ7BpZRi2fo\n" +
                   "EJdVMZd1ZxBDXMxETwx/F1qNTwsq6mkvXY66/0Qp8acJuSVARekc8dusvwARAQAB\n" +
                   "tCJQYXRyaWNrIE5lYXZlIDxwbmVhdmVAbWlsaG91c2UudWs+iQI1BBABCAApBQJa\n" +
                   "qlgcBgsJBwgDAgkQSeR2xaQQ9qEEFQgKAgMWAgECGQECGwMCHgEAAHDCD/4wLBB/\n" +
                   "nhPliM1jLIwaWPpLVmpPBgDOnWj0WZWk7tfb78G1hp9+MY3LDx6fCeATWxETKgfM\n" +
                   "IlPP9TyWxPXaIyYqdO3pwhrPUekKaT3kcDNAxqgDxrbtOK1yQhL8Y7Y7uYCAt0ft\n" +
                   "8OFiPKAGfyoDT3UnUNkfH/Q54mC8B8oQ+SmR3b9n3lNvMzUc3KhxhkqXF25/Myj1\n" +
                   "ubCQBNVlq1+TegyMH/NLlHyz/ujQdMNNND+WEDVnuM29NqvJX3qW2rXQkSCFcPL6\n" +
                   "vny1EjigEje4wUbDGbtavUHT6Ahecec9647SpP18XFMl9SltlBdzB41iBX76C7ll\n" +
                   "Z/YyrPMZ7VWSP/00JEuZLfIc6EQPJwf1irjLIptVF/Lo2qetT61vNH+XGgP6sK9/\n" +
                   "IxqViq3i0CuFoP1TbrUwDpmfLkYz64SMguTYLIZNvACT33+4PR3AB22K8OXOAUKc\n" +
                   "kSfya7Eh/PgZs+/kHutcA8/F9fV7sH2kmZ9giAG2kTfMN+9b9ifKzyaoDtL28bMo\n" +
                   "WjYQNKc3O8yd7boDqhnny3uRTqCZmzUtPwyPtuEoTPnK7zgTIJQwrsO/4088oXON\n" +
                   "SHvPM6v3dvWKRhmgwEER/DGyj0GjJaksMODVFlub6S/0vik3JC22r2LFjMnugKA8\n" +
                   "Z7mW218voCSjetNYpMrcGhQHcnKaSkvqt6Ltn7kCDQRaqlgbARAAtd1Ai7O3ghUw\n" +
                   "G5HB9epZ+07qLzsCdPvVei4S0GGupgpsdYUWiuwU655El9G0m8pQsHgYnCxigD5H\n" +
                   "CZ66IMN+j6X3oX3Nvnogtjo1QvxJJUdFjCvSx04woDO1zvCH08OMcJJu3nztTdpq\n" +
                   "B7Hpl0e8ncE+a0yyslBtJBeu8MDtJBsvw4DSQyMPp6RxZf0kj6aUn8jqblRSak94\n" +
                   "zIY60lHly4DCSDKyK42s5monxhFcZ28fmf234UivuRcFuJUT8tXQphyxE1DFr5sN\n" +
                   "Zh2PbLIyIdFw39WXgfRdS4kxf39PCigdmoEbkphkx9D+3dwwgYkQSj2R5IABTyiB\n" +
                   "Ez73/WJ9i3hpZwaNttqsueyFIGnoeJjBiqMcPX2NfAGpWUQeStTezZ5D3pKe8vP8\n" +
                   "/euua7dfqpbBBs/f3i3d8J2gC/YyMhGP78fHTkZhWRNuaeM02ePky8KCXPBbFDyF\n" +
                   "C+ubz/duv83HxNK5WYu1CZsLxbBXuab3IODLeQShTBfCPyRkDAn/SwntBiKIniot\n" +
                   "Ht7ndOZ2tNdayUuQVR4ptPEJYaaxW3KueiuRooCIUoBx+reiyFH1fno4y65Orul9\n" +
                   "1tEH9ICDL5tYkzr0kbFIrzVQl7wkmYCenq161Cv4Y+A7oSXmYZ0xWa1Csww/5TaQ\n" +
                   "sxsn3sHzjPAn+uBSN/utZXdJQoXDZJsAEQEAAYkCHwQYAQgAEwUCWqpYHgkQSeR2\n" +
                   "xaQQ9qECGwwAALpmD/4lPZa761BCJKSGGXYaTNN7WumSJaIBo2sdaxPiemacR++x\n" +
                   "6IJp6A8LtNR9KZ6vBTO6H+krOpKHkNqIfKiVZQm9wZlezSZUPFdFjFxX+1n4RwfM\n" +
                   "tg7nnCMhZKrONQFSdj910qRQDIj965H8hVKcLewDsyT/KoEOEtHnVjoiOAm2hrcq\n" +
                   "CjhBnbicJ7LkfoyDG5pnIb9IUHX2jJ75XX9Tw9kiMtNPCnxbCvjKmiLtfeReJou8\n" +
                   "LpntehGhFEK/mezKuCV8QpO/0sY1NU2Pj3RdUnXh+KiZbq2bFwAoVAHpUJppOQe4\n" +
                   "jui05e0z4DCMKeD0lgaXu/fyc9gDfNl9iwHaBhHW06K8pYUwMAHsX8JHIinM03Td\n" +
                   "+XltFbYXRjxWivScRQWg+ZzEMAXYMASWpqoCY8imABY3kyX/d6S/R6FOrbBbc0m1\n" +
                   "dqPsdssu7Lkr2Bx6C3RKlOuzkIYqURcJYqnuEqbhTtisWSf9jrouipvgBYrZ7zfy\n" +
                   "F6nssxY8iU/XmGmSKJVcBej4HbzQSnfdS9nl88AChqzHNT4VKm89CADJpEipT/2F\n" +
                   "a4SFTw/s2rmf6cIRgn0GyD12uOIU7wC6UM6EScPIt0sgPo8XzgWn5TeR9x43vPLA\n" +
                   "lbhjxh90vpJDCFTiY4vvj4B0lzJ6Eh/932Te2uD2H3dWwnz2YgMqThLnQzrPhA==\n" +
                   "=f5Nj\n" +
                   "-----END PGP PUBLIC KEY BLOCK-----";

      var options = {
        data: $('#input').val(),                           // input as String (or Uint8Array)
        publicKeys: openpgp.key.readArmored(pubkey).keys,  // for encryption
      };
      openpgp.encrypt(options).then(function(ciphertext) {
        $('#input').val(ciphertext.data);
      });

      $('#button').html("Clear");
      return true;
    } else {
      $('#input').val("");
      $('#button').html("Encrypt");
    }
  } else {
    $("#button").val("Error");
    window.alert("This browser isn't supported!");
    return false;
  }
}
