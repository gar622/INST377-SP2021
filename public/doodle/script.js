document.addEventListener('DOMContentLoaded',()=>{
    const grid = document.querySelector('.grid')
    const doodler = document.createElement('div')
    let doodlerLeftSpace = 50;
    let doodlerBottomSpace = 150
    let isGameOver = false

    function createDoodler() {
        grid.appendChild(doodller)
        doodler.classList.add('doodler')
        doodler.style.left = doodlerLeftSpace + 'px'
        doodler.style.bottom = doodlerBottomSpace + 'px'

    }
    class Platform{
        constructor(newPlatBottom){
            this.bottom = newPlatBottom
            this.left = math.random() * 315
            this.visual = document.createElement('div')

            const visual = this.visual 
            visual.classList.add('platform')
            visual.style.left = this.left + 'px'
            visual.style.bottom = this.bottom + 'px'
            grid.appendChild(visual)
        }
    }
    function createPlatforms() {
        for(let i = 0; i < platformCount; i++){
            let platGap = 600 / platformCount
            let newPlatBottom = 100 + i * platGap
            let newPlatform = new Platform(newPlatBottom)
        }
    }

    function start() {
        if (!isGameOver){
            createDoodler()
            
        }
    }
})