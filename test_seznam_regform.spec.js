// test_seznam_regform.spec.js created with Cypress

//

// Miroslav Kadidlo

//

// 2021

//

// Start writing your Cypress tests below!

// If you're unfamiliar with how Cypress works,

// check out the link below and learn how to write your first test:

// https://on.cypress.io/writing-first-test
	

      //

      // Empty fields

      //
 

describe('Seznam.cz REG-FORM test', () => {

    it('Go to seznam.cz', () => {

      // Visit seznam.cz

      cy.visit('https://www.seznam.cz')

      // Find element with "Založit nový e-mail" and click on it.

      cy.contains('Založit nový e-mail').click()

    })

 

    it('Try pass with empty fields', () => {

      // Click on button and submit form data.

      cy.get('.main > button[type="submit"]').click()

      // Except error class in input element with id(register-username) and show error message. 

      cy.get('input#register-username.error').should('have.value', '')
      cy.get('.error > i').contains('Zadejte e-mail')

    })

	

    it('Try pass with empty email and try switch domain', () => {

      // Try pass with change domain and empty sex(male/female) with empty email. Except error class and error message.

      cy.get('.main > select[name="domain"]').select('@seznam.cz').should('have.value', '@seznam.cz')
      cy.get('.main > button[type="submit"]').click()
      cy.get('input#register-username.error').should('have.value', '')
      cy.get('.error > i').contains('Zadejte e-mail')

      cy.get('.main > select[name="domain"]').select('@email.cz').should('have.value', '@email.cz')
      cy.get('.main > button[type="submit"]').click()

      cy.get('input#register-username.error').should('have.value', '')
      cy.get('.error > i').contains('Zadejte e-mail')

      cy.get('.main > select[name="domain"]').select('@post.cz').should('have.value', '@post.cz')
      cy.get('.main > button[type="submit"]').click()
      cy.get('input#register-username.error').should('have.value', '')
      cy.get('.error > i').contains('Zadejte e-mail')

      cy.get('.main > select[name="domain"]').select('Vlastní adresa').should('have.value', '')
      cy.get('.main > button[type="submit"]').click()
      cy.get('input#register-username.error').should('have.value', '')
      cy.get('.error > i').contains('Zadejte e-mail')

    })

 

    it('Checking empty fields cause error', () => {

      // Checking other empty fields will cause error with password, birth year, sex, terms and conditions

      cy.get('.main > input[type="password"][data-placeholder="register.password1"]').should('have.value', '')
      cy.get('.error > i').contains('Zadejte heslo')

      cy.get('.main > input[type="password"][data-placeholder="register.password2"]').should('have.value', '')
      cy.get('.error > i').contains('Zadejte heslo')

      cy.get('input#register-year.error').should('have.value', '')
      cy.get('.error > i').contains('Neplatný rok narození')

      cy.get('.error > i').contains('Zvolte své pohlaví')
      cy.get('.error > i').contains('Neobejdeme se bez vašeho souhlasu.')

    })


      //

      // End of empty fields

      //

 
      //

      // Other combinations

      //
 

    it('Try create email pepa at seznam, post and email. Try create my own mail.', () => {  

      // Known adresses cause error


      cy.get('.main > select[name="domain"]').select('@seznam.cz').should('have.value', '@seznam.cz')
      cy.get('input#register-username').type('pepa').should('have.value', 'pepa')
      cy.get('.main > button[type="submit"]').click()
      cy.get('.error > i').contains('Adresa už je obsazená')

      cy.get('.main > select[name="domain"]').select('@post.cz').should('have.value', '@post.cz')
      cy.get('.main > button[type="submit"]').click()
      cy.get('.error > i').contains('Adresa už je obsazená')

      cy.get('.main > select[name="domain"]').select('@email.cz').should('have.value', '@email.cz')
      cy.get('.main > button[type="submit"]').click()
      cy.get('.error > i').contains('Adresa už je obsazená')

      cy.get('input#register-username').clear().type('kadidlo.miroslav@gmail.com').should('have.value', 'kadidlo.miroslav@gmail.com')
      cy.get('.main > button[type="submit"]').click()
      cy.get('.error > i').contains('Adresa už je obsazená')

    })

 

    it('Check invalid characters in email', () => {

      // Check invalid characters in mail address

      cy.get('input#register-username').clear().type('---').should('have.value', '---')
      cy.get('.main > button[type="submit"]').click()
      cy.get('.error > i').contains('Adresa obsahuje neplatné znaky')

      cy.get('input#register-username').clear().type('abababa*1').should('have.value', 'abababa*1')
      cy.get('.main > button[type="submit"]').click()
      cy.get('.error > i').contains('Adresa obsahuje neplatné znaky')

      cy.get('input#register-username').clear().type('§pecka').should('have.value', '§pecka')
      cy.get('.main > button[type="submit"]').click()
      cy.get('.error > i').contains('Adresa obsahuje neplatné znaky')

    })

 

    it('Try create original email name on all domain exept own domain', () => {

      // Check original mail 

      cy.get('input#register-username').clear().type('thisisanoriginalmail201').should('have.value', 'thisisanoriginalmail201')
      cy.get('.main > select[name="domain"]').select('@seznam.cz').should('have.value', '@seznam.cz')
      cy.get('.main > button[type="submit"]').click()
      cy.get('.error > i').contains('Adresa už je obsazená').should('not.exist')

      cy.get('input#register-username').clear().type('thisisanoriginalmail201').should('have.value', 'thisisanoriginalmail201')
      cy.get('.main > select[name="domain"]').select('@post.cz').should('have.value', '@post.cz')
      cy.get('.main > button[type="submit"]').click()
      cy.get('.error > i').contains('Adresa už je obsazená').should('not.exist')

      cy.get('input#register-username').clear().type('thisisanoriginalmail201').should('have.value', 'thisisanoriginalmail201')
      cy.get('.main > select[name="domain"]').select('@email.cz').should('have.value', '@email.cz')
      cy.get('.main > button[type="submit"]').click()
      cy.get('.error > i').contains('Adresa už je obsazená').should('not.exist')

    })

 

    it('Check weak password', () => {

      // Check Weak password 

      cy.get('.main > input[type="password"][placeholder="Heslo"]').type('123456').should('have.value', '123456')
      cy.get('.main > button[type="submit"]').click()
      cy.get('.error > i').contains('Heslo je příliš slabé')

    })

 

    it('Check strong password', () => {

    // Check strong password 

      cy.get('.main > input[type="password"][placeholder="Heslo"]').clear().type('45ZZdnetfjfjf').should('have.value', '45ZZdnetfjfjf')
      cy.get('.main > button[type="submit"]').click()
      cy.get('.error > i').contains('Heslo obsahuje zakázané znaky').should('not.exist')

    })

 
 
    it('Check forbidden characters', () => {

    // Check forbidden characters

      cy.get('.main > input[type="password"][placeholder="Heslo"]').clear().type('45ZZdnet*+ůfjfjf?').should('have.value', '45ZZdnet*+ůfjfjf?')
      cy.get('.main > button[type="submit"]').click()
      cy.get('.error > i').contains('Heslo obsahuje zakázané znaky')

    })

 

    it('Check password match', () => {

      // Password doesn't mach

      cy.get('.main > input[type="password"][placeholder="Heslo"]').clear()
      cy.get('.main > input[type="password"][placeholder="Heslo ještě jednou"]').clear()
      cy.get('.main > input[type="password"][placeholder="Heslo"]').clear().type('45ZZdnetfjfjf').should('have.value', '45ZZdnetfjfjf')
      cy.get('.main > input[type="password"][placeholder="Heslo ještě jednou"]').clear().type('epsilonepsilo').should('have.value', 'epsilonepsilo')
      cy.get('.main > button[type="submit"]').click()
      cy.get('.error > i').contains('Hesla se neshodují')

 

      // Password mach

      cy.get('.main > input[type="password"][placeholder="Heslo"]').clear()
      cy.get('.main > input[type="password"][placeholder="Heslo ještě jednou"]').clear()
      cy.get('.main > input[type="password"][placeholder="Heslo"]').type('45ZZdnetfjfjf').should('have.value', '45ZZdnetfjfjf')
      cy.get('.main > input[type="password"][placeholder="Heslo ještě jednou"]').type('45ZZdnetfjfjf').should('have.value', '45ZZdnetfjfjf')
      cy.get('.main > button[type="submit"]').click()

      // element is still in DOM. Is it error?

      cy.get('.error > i').contains('Hesla se neshodují').should('not.exist')

    })

 

    it('Check correct year', () => {

      // Check correct year

      cy.get('input#register-year').clear().type('aaaa').should('have.value', 'aaaa')
      cy.get('.main > button[type="submit"]').click()
      cy.get('.error > i').contains('Neplatný rok narození')

      cy.get('input#register-year').clear().type('1899').should('have.value', '1899')
      cy.get('.main > button[type="submit"]').click()
      cy.get('.error > i').contains('Neplatný rok narození')

      cy.get('input#register-year').clear().type('2022').should('have.value', '2022')
      cy.get('.main > button[type="submit"]').click()
      cy.get('.error > i').contains('Neplatný rok narození')

      cy.get('input#register-year').clear().type('2021').should('have.value', '2021')
      cy.get('.main > button[type="submit"]').click()
      cy.get('.error > i').contains('Neplatný rok narození')

      cy.get('input#register-year').clear().type('1990').should('have.value', '1990')
      cy.get('.main > button[type="submit"]').click()
      cy.get('.error > i').contains('Neplatný rok narození')

    })

 

    it('Check man/woman radioset', () => {

      // Try click on radiobutton man

      cy.get('.radioset input').check(['m'], {force: true})
      cy.get('.main > button[type="submit"]').click()

      // Try click on radiobutton woman

      cy.get('.radioset input').check(['f'], {force: true})
      cy.get('.main > button[type="submit"]').click()

    })

 

    it('Check agree checkbox and create account - Except cause error because seznam indicates web robot.', () => {

      // Check agree checkbox

      cy.get('[type="checkbox"]').check({force: true})
      cy.get('.main > button[type="submit"]').click()
      cy.contains('Co se dá dělat').click({force: true})

    })
    
      //

      // End of other combinations

      //

  })
