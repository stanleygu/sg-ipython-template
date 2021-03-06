/*jshint quotmark: false*/
'use strict';

angular.module('stanleygu.ipythonTemplate')
  .value('sgIpythonTemplate', {
    empty: {
      "metadata": {},
      "nbformat": 3,
      "nbformat_minor": 0,
      "worksheets": [{
        "cells": [],
        "metadata": {}
      }]
    },
    model: {
      "metadata": {},
      "nbformat": 3,
      "nbformat_minor": 0,
      "worksheets": [{
        "cells": [{
          "cell_type": "markdown",
          "metadata": {},
          "source": [
            "# Model Notebook\n",
            "\n",
            "## Importing libaries and loading model"
          ]
        }, {
          "cell_type": "code",
          "collapsed": true,
          "input": [
            "# import tellurium as te\n",
            "import tellurium as te\n",
            "import roadrunner\n",
            "from IPython.html.widgets import interact, interactive, fixed\n",
            "from IPython.html import widgets\n",
            "from IPython.display import clear_output, display, HTML\n",
            "import sys\n",
            "%matplotlib inline\n"
          ],
          "language": "python",
          "metadata": {},
          "outputs": []
        }, {
          "cell_type": "markdown",
          "metadata": {},
          "source": [
            "## Helper functions"
          ]
        }, {
          "cell_type": "code",
          "collapsed": false,
          "input": [
            "import matplotlib.pyplot as plt\n",
            "\n",
            "def plot(result, show=True, legend=False):\n",
            "    import pylab as p\n",
            "\n",
            "    if result.dtype.names is None:\n",
            "        # treat as a regular array\n",
            "        p.plot(result[:,0], result[:,1:])\n",
            "\n",
            "    else:\n",
            "        if len(result.dtype.names) < 1:\n",
            "            raise Exception('no columns to plot')\n",
            "\n",
            "        time = result.dtype.names[0]\n",
            "\n",
            "        for name in result.dtype.names[1:]:\n",
            "            p.plot(result[time], result[name], label='$' + name + '$')\n",
            "    \n",
            "    if legend:\n",
            "        p.legend(loc = legend)\n",
            "        \n",
            "    if show:\n",
            "        p.show()\n"
          ],
          "language": "python",
          "metadata": {},
          "outputs": []
        }, {
          "cell_type": "markdown",
          "metadata": {},
          "source": [
            "## Interactive Simulation"
          ]
        }, {
          "cell_type": "code",
          "collapsed": false,
          "input": [
            "def runSim(start=0, stop=100, steps=100, **paramMap):\n",
            "    r.reset()\n",
            "    for k,v in paramMap.items():\n",
            "        try:\n",
            "            key = k.encode('ascii', 'ignore')\n",
            "            r.model[key] = v\n",
            "        except:\n",
            "            # error in setting model variable\n",
            "            e = sys.exc_info()\n",
            "            print e\n",
            "            \n",
            "    try: \n",
            "        s = r.simulate(start, stop, steps)\n",
            "        plot(s)\n",
            "    except:\n",
            "        # error in simulation\n",
            "        e = sys.exc_info()\n",
            "        print e\n",
            "    \n",
            "\n",
            "\n",
            "paramIds = r.model.getGlobalParameterIds()\n",
            "paramValues = r.model.getGlobalParameterValues()\n",
            "paramMap = {}\n",
            "\n",
            "for i, id in enumerate(paramIds):\n",
            "    val = paramValues[i]\n",
            "    try:\n",
            "        r.model[id] = val\n",
            "        paramMap[id] = widgets.FloatSliderWidget(\n",
            "                    min=0, max=val*2, step=val/10, value=val)\n",
            "    except:\n",
            "        e = sys.exc_info()\n",
            "        print e\n",
            "\n",
            "i = interact(runSim,\n",
            "         start=widgets.FloatTextWidget(min=0, value=0),\n",
            "         stop=widgets.FloatTextWidget(min=0, value=100),\n",
            "         steps=widgets.IntTextWidget(min=0, value=100),\n",
            "#          yourParamId=(0, 100) # For a single slider\n",
            "         **paramMap\n",
            "         )"
          ],
          "language": "python",
          "metadata": {},
          "outputs": []
        }],
        "metadata": {}
      }]
    }
  });
