//Esta função ela é responsável por verificar se estamos num tamanho de viewport que consideramos como dispositivos moveis
export const isMobile = ()=> {
    return(
        Cypress.config('viewportWidth') < 
        Cypress.env("mobileViewportWidthBreakpoint")
    )
}