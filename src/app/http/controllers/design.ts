import { Request, Response } from 'express';

import * as designService from '../services/design';
import { APP, Get, Post } from '../../helpers/decorator';
import { validate } from '../../helpers/validate';
import * as designSchema from '../validators/design';
import auth from '../middlewares/auth';
import { TEMPLATE_DEFAULT } from '../../enums/template';
import { isDesign, isOwner } from '../middlewares/design';

@APP('/designs', [auth])
export default class Designs {
  @Get('/')
  async getDesigns(req: Request, res: Response) {
    const userId = req.user.id;
    const designs = await designService.getDesigns(userId);

    res.status(200).send(designs);
  }

  @Get('/check-domain')
  async checkExistDomain(req: Request, res: Response) {
    const params = {
      domain: req.query.domain,
    };
    const formatParams = await validate(designSchema.checkExistDomain, params);
    const responseData = await designService.checkExistDomain(formatParams);
    res.status(200).send(responseData);
  }

  @Post('/')
  async createDesign(req: Request, res: Response) {
    const params = {
      userId: req.user.id,
      domain: req.body.domain,
      templateId: req.body.templateId || TEMPLATE_DEFAULT,
      groomName: req.body.groomName,
      groomMotherName: req.body.groomMotherName,
      groomFatherName: req.body.groomFatherName,
      brideName: req.body.brideName,
      brideMotherName: req.body.brideMotherName,
      brideFatherName: req.body.brideFatherName,
      location: req.body.location,
      time: req.body.time,
    };

    const formatParams = await validate(designSchema.createDesign, params);
    const responseData = await designService.createDesign(formatParams);
    res.status(200).send(responseData);
  }
  @Get('/:id/draft', [isDesign, isOwner])
  async getMyDesignDraft(req: Request, res: Response) {
    const responseData = await designService.getDesignDraft({ designId: req.design.id });

    res.status(200).send(responseData);
  }

  @Post('/:id/draft/data', [isDesign, isOwner])
  async updateDraftDesignData(req: Request, res: Response) {
    const params = {
      data: req.body.data,
    };
    const formatParams = await validate(designSchema.updateDraftDesignData, params);
    await designService.updateDraftDesignData({
      designId: req.design.id,
      data: formatParams.data,
    });
    res.status(200).send({
      success: true,
    });
  }

  @Post('/:id/draft/animation', [isDesign, isOwner])
  async updateDesignDraftAnimation(req: Request, res: Response) {
    const animation = req.body.animation ? `${req.body.animation}` : '';
    const designId = req.design.id;
    await designService.updateDesignDraftAnimation(animation, designId);

    res.status(200).send({
      success: true,
    });
  }

  @Post('/:id/user-info', [isDesign, isOwner])
  async updateDesignUserInfo(req: Request, res: Response) {
    const designId = req.design.id;

    const params = {
      groomName: req.body.groomName,
      groomMotherName: req.body.groomMotherName,
      groomFatherName: req.body.groomFatherName,
      brideName: req.body.brideName,
      brideMotherName: req.body.brideMotherName,
      brideFatherName: req.body.brideFatherName,
      location: req.body.location,
      time: req.body.time,
    };
    const formatParams = await validate(designSchema.updateDesignUserInfo, params);
    await designService.updateDesignUserInfo(formatParams, designId);

    res.status(200).send({
      success: true,
    });
  }

  @Post('/:id/receivers', [isDesign, isOwner])
  async updateDesignReceivers(req: Request, res: Response) {
    const designId = req.design.id;
    const receivers = `${req.body.receivers}`;
    await designService.updateDesignReceivers(designId, receivers);

    res.status(200).send({
      success: true,
    });
  }

  @Get('/:id/info', [isDesign, isOwner])
  async getDesignInfo(req: Request, res: Response) {
    const design = req.design;
    res.status(200).send(design);
  }
}
