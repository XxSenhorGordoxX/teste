document.addEventListener('DOMContentLoaded', () => {
  // 1) Dados para popular dropdowns:
  const optionsData = {
    'melee-dropdown': ['Superhuman','Death Step','Electric Claw','Dragon Talon','Godhuman','Sanguine Art', 'Eletric','Water Kong Fu', 'Dark Step', 'Dragon Breath', 'Combat'],
    'sword-dropdown': ['Cursed Dual Katana','True Triple Katana','Hallow Scythe','Spikey Trident','Dark Blade','Yama','Tushita', 'Triple Katana', 'Dual Katana', 'Cutlass', 'Iron Mace', 'Shark Saw', 'Dragon Trident', 'Dual-Headed Blade', 'Flail', 'Gravity Blade', 'Longsowrd', 'Spikey Trident', 'Pipe', 'Soul Cane', 'Trident', 'Wardens Sword', 'Fox Lamp', 'Koko', 'Midnightblade', 'Canvande', 'Dark Dagger', 'Dragonheart', 'Pole V1', 'Pole V2', 'Rengoku', 'Saber', 'Shaisi', 'Shark Ancor', 'Shizu', 'Oroshi'],
    'gun-dropdown': ['Soul Guitar','Acidum Rifle','Kabucha','Serpent Bow', 'Slingshot', 'Flintlock', 'Musket', 'Bizarre Revolver', 'Cannon', 'Dual Flintlock', 'Magma Blaster', 'Refined Slingshot', 'Bazooka'],
    'fruit-dropdown': ['Kitsune','Leopard','Dragon','Control','Spirit','Venom','Shadow','Dough','Blizzard','Pain','Phoenix','Rumble','Portal','Buddha','Love','Spider','Sound','Light','Magma','Quake','Ghost','Creation','Rubber','Diamond','Dark','Sand','Ice','Eagle','Flame','Spike','Smoke','Bomb','Spring','Blade','Spin','Rocket']
  };

  // 2) Mapa de pontos definido por você (back-end JS):
  const pointsMap = {
    // Melee
    'Superhuman': 2,
    'Death Step': 2,
    'Electric Claw': 3,
    'Dragon Talon': 2,
    'Godhuman': 3,
    'Sanguine Art': 3,
    'Eletric': 1,
    'Water Kong Fu': 1,
    'Dark Step': 1,
    'Dragon Breath': 1,
    'Combat': 3,
  
    // Sword
    'Cursed Dual Katana': 3,
    'True Triple Katana': 3,
    'Hallow Scythe': 2,
    'Spikey Trident': 2,
    'Dark Blade': 2,
    'Yama': 2,
    'Tushita': 2,
    'Triple Katana': 1,
    'Dual Katana': 1,
    'Cutlass': 1,
    'Iron Mace': 1,
    'Shark Saw': 1,
    'Dragon Trident': 3,
    'Dual-Headed Blade': 1,
    'Flail': 1,
    'Gravity Blade': 3,
    'Longsowrd': 1,
    'Pipe': 1,
    'Soul Cane': 1,
    'Trident': 1,
    'Wardens Sword': 1,
    'Fox Lamp': 3,
    'Koko': 2,
    'Midnightblade': 2,
    'Canvande': 1,
    'Dark Dagger': 2,
    'Dragonheart': 3,
    'Pole V1': 1,
    'Pole V2': 2,
    'Rengoku': 2,
    'Saber': 2,
    'Shaisi': 2,
    'Shark Ancor': 3,
    'Shizu': 2,
    'Oroshi': 1,
  
    // Gun
    'Soul Guitar': 3,
    'Acidum Rifle': 2,
    'Kabucha': 2,
    'Serpent Bow': 2,
    'Slingshot': 1,
    'Flintlock': 1,
    'Musket': 1,
    'Bizarre Revolver': 2,
    'Cannon': 1,
    'Dual Flintlock': 2,
    'Magma Blaster': 2,
    'Refined Slingshot': 1,
    'Bazooka': 1,
  
    // Fruit
    'Kitsune': 3,
    'Leopard': 3,
    'Dragon': 3,
    'Control': 2,
    'Spirit': 2,
    'Venom': 2,
    'Shadow': 3,
    'Dough': 3,
    'Blizzard': 2,
    'Pain': 2,
    'Phoenix': 2,
    'Rumble': 3,
    'Portal': 3,
    'Buddha': 2,
    'Love': 2,
    'Spider': 2,
    'Sound': 2,
    'Light': 2,
    'Magma': 2,
    'Quake': 2,
    'Ghost': 2,
    'Creation': 2,
    'Rubber': 2,
    'Diamond': 2,
    'Dark': 2,
    'Sand': 2,
    'Ice': 3,
    'Eagle': 2,
    'Flame': 2,
    'Spike': 1,
    'Smoke': 1,
    'Bomb': 1,
    'Spring': 1,
    'Blade': 1,
    'Spin': 1,
    'Rocket': 1
  };
  

  // Funções de dropdown (populate, filter, open/close)
  const selectionBoxes = document.querySelectorAll('.selection-box');
  const dropdownContents = document.querySelectorAll('.dropdown-content');

  function populateDropdown(id, opts) {
    const dd = document.getElementById(id);
    dd.innerHTML = '';
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Buscar ou digitar...';
    input.addEventListener('keyup', e => filterOptions(e.target, id));
    dd.appendChild(input);
    opts.forEach(o => {
      const div = document.createElement('div');
      div.textContent = o;
      div.addEventListener('click', () => {
        const box = document.getElementById(id.replace('-dropdown','-box'));
        const h2 = box.querySelector('h2');
        h2.textContent = `${h2.textContent.split(' - ')[0]} - ${o}`;
        closeAll();
      });
      dd.appendChild(div);
    });
  }

  function filterOptions(inp, id) {
    const filt = inp.value.toLowerCase();
    document.getElementById(id)
      .querySelectorAll('div')
      .forEach(d => {
        d.style.display = d.textContent.toLowerCase().includes(filt) ? '' : 'none';
      });
  }

  function closeAll() {
    dropdownContents.forEach(c => c.style.display = 'none');
  }

  selectionBoxes.forEach(box => {
    const dd = document.getElementById(box.id.replace('-box','-dropdown'));
    if (optionsData[dd.id]) populateDropdown(dd.id, optionsData[dd.id]);
    box.addEventListener('click', e => {
      if (e.target.tagName === 'INPUT' ||
          e.target.parentElement.classList.contains('dropdown-content')) {
        e.stopPropagation();
        return;
      }
      const isOpen = dd.style.display === 'block';
      closeAll();
      if (!isOpen) {
        dd.style.display = 'block';
        const inp = dd.querySelector('input');
        inp.focus();
        inp.value = '';
        filterOptions(inp, dd.id);
      }
    });
  });

  document.addEventListener('click', e => {
    if (![...selectionBoxes].some(b => b.contains(e.target))) {
      closeAll();
    }
  });

  // 3) Funcionalidade de seleção de pontos (destacar borda)
  const pointBlocks = document.querySelectorAll('.point-block');
  pointBlocks.forEach(block => {
    block.addEventListener('click', () => {
      pointBlocks.forEach(b => b.classList.remove('selected'));
      block.classList.add('selected');
    });
  });

  // 4) Cálculo da média ponderada ao clicar em "Analisar Build"
  document.getElementById('analyze-button').addEventListener('click', () => {
    const cats = ['melee','fruit','sword','gun'];
    // Pesos: melee=1, outras categorias=2
    const weightMap = { melee: 2, fruit: 2, sword: 2, gun: 2 };
    let weightedSum = 0;
    let totalWeight = 0;
    let text = 'Build Selecionada:\n';

    cats.forEach(cat => {
      const box = document.getElementById(`${cat}-box`);
      const h2 = box.querySelector('h2');
      const name = h2.textContent.split(' - ')[1] || null;
      text += `- ${h2.textContent.split(' (')[0]}: ${name || 'Nada selecionado'}\n`;
      if (name && pointsMap[name] != null) {
        const pts = pointsMap[name];
        const w = weightMap[cat] || 1;
        weightedSum += pts * w;
        totalWeight += w;
      }
    });

    if (totalWeight < Object.values(weightMap).reduce((a, b) => a + b, 0)) {
      text += '\nPor favor, selecione uma opção para cada categoria.';
    } else {
      const avg = weightedSum / totalWeight;
      let label;
      if (avg <= 1.5)      label = 'Skill';
      else if (avg <= 2.5) label = 'Meio Skill';
      else                 label = 'No Skill';
      text += `\n→ ★ ${label}★`;
    }

    const pre = document.createElement('pre');
    pre.textContent = text;
    const result = document.getElementById('result-section');
    result.innerHTML = '';
    result.appendChild(pre);
  });
});
