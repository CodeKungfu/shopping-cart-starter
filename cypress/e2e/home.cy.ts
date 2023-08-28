describe('template spec', () => {
  beforeEach(() => {
    cy.visit('https://codekungfu.github.io/shopping-cart-starter')
  })
  it('显示价格升序和价格降序按钮', () => {
    cy.get('.ant-radio-group label').should('have.length', 2)
    cy.get('.ant-radio-group label').first().should('have.text', '按价格升序')
    cy.get('.ant-radio-group label').last().should('have.text', '按价格降序')
  })
  it('默认展示20条数据', () => {
    cy.get('.flex-wrap>div').should('have.length', 20)
  })
  it ('购物车是空的', ()=> {
    cy.get('.ant-badge').click()
    cy.get('.carproduct').should('have.text', '购物车是空的')
  })
  it ('可以过滤尺寸', ()=> {
    cy.get(':nth-child(1) > .ant-checkbox > .ant-checkbox-input').click()
  })
})